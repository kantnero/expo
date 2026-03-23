import { requireNativeModule } from 'expo';
import { SharedObject, useReleasingSharedObject } from 'expo-modules-core';
import type { DependencyList } from 'react';

const ExpoUI = requireNativeModule('ExpoUI');

// MARK: - ToggleState

type ToggleStateEvents = {
  isOnChange: (payload: { isOn: boolean }) => void;
};

/**
 * Observable state for a Toggle, shared between JavaScript and SwiftUI.
 *
 * Changes from either side are synchronized automatically:
 * - Setting `state.isOn` from JS updates the SwiftUI view.
 * - Toggling in the native UI emits the `isOnChange` event to JS.
 */
export declare class ToggleState extends SharedObject<ToggleStateEvents> {
  /**
   * The current on/off value of the toggle.
   */
  isOn: boolean;
}

/**
 * Creates a `ToggleState` that is automatically cleaned up when the component unmounts.
 *
 * @example
 * ```tsx
 * const state = useToggleState(false);
 *
 * state.addListener('isOnChange', ({ isOn }) => {
 *   console.log('Toggle changed:', isOn);
 * });
 *
 * return <Toggle state={state} label="Airplane Mode" />;
 * ```
 */
export function useToggleState(initialValue: boolean = false): ToggleState {
  return useReleasingSharedObject(() => {
    const state = new ExpoUI.ToggleState() as ToggleState;
    state.isOn = initialValue;
    return state;
  }, [initialValue]);
}

// MARK: - TextFieldState

type TextFieldStateEvents = {
  textChange: (payload: { text: string }) => void;
  focusChange: (payload: { isFocused: boolean }) => void;
};

/**
 * Observable state for a TextField, shared between JavaScript and SwiftUI.
 *
 * Replaces the imperative ref API (`ref.setText()`, `ref.focus()`) with direct property access:
 * - `state.text = "hello"` updates the native text field
 * - `state.isFocused = true` focuses the field
 * - Reading `state.text` returns the current value
 */
export declare class TextFieldState extends SharedObject<TextFieldStateEvents> {
  /** The current text value. */
  text: string;
  /** Whether the field is focused. */
  isFocused: boolean;
}

/**
 * Creates a `TextFieldState` that is automatically cleaned up when the component unmounts.
 *
 * @example
 * ```tsx
 * const state = useTextFieldState('');
 *
 * state.addListener('textChange', ({ text }) => {
 *   console.log('Text:', text);
 * });
 *
 * // Focus from JS:
 * state.isFocused = true;
 *
 * return <TextField state={state} placeholder="Enter text" />;
 * ```
 */
export function useTextFieldState(initialValue: string = ''): TextFieldState {
  return useReleasingSharedObject(() => {
    const state = new ExpoUI.TextFieldState() as TextFieldState;
    if (initialValue) {
      state.text = initialValue;
    }
    return state;
  }, [initialValue]);
}

// MARK: - Utilities

/**
 * Extracts the native shared object ID from a SharedObject instance.
 * Used internally to pass SharedObject references as view props.
 */
export function getStateId(state?: object): number | undefined {
  if (!state) {
    return undefined;
  }
  return (state as { __expo_shared_object_id__?: number }).__expo_shared_object_id__;
}

/**
 * Creates a shared state that is automatically cleaned up when the component unmounts.
 * Generic hook for creating any ObservableState subclass registered in the module.
 */
export function useSharedState<T extends InstanceType<typeof SharedObject>>(
  factory: () => T,
  deps: DependencyList = []
): T {
  return useReleasingSharedObject(factory, deps);
}

// MARK: - Worklet support

let _serializerRegistered = false;

/**
 * Registers a custom serializer so SharedObjects automatically work in worklets.
 * Call once after `installOnUIRuntime()`. After registration, SharedObjects captured
 * by worklet closures are automatically packed/unpacked — no manual wrapping needed.
 *
 * @example
 * ```tsx
 * import { installOnUIRuntime } from 'expo-modules-core';
 * installOnUIRuntime();
 * registerSharedObjectSerializer();
 *
 * // Now SharedObjects just work in worklets:
 * const state = useToggleState(false);
 * runOnUI(() => {
 *   'worklet';
 *   state.isOn = true;
 * })();
 * ```
 */
export function registerSharedObjectSerializer(): void {
  if (_serializerRegistered) {
    return;
  }
  _serializerRegistered = true;

  const { registerCustomSerializable } = require('react-native-worklets') as {
    registerCustomSerializable: (data: {
      name: string;
      determine: (value: object) => boolean;
      pack: (value: any) => any;
      unpack: (value: any) => any;
    }) => void;
  };

  registerCustomSerializable({
    name: 'ExpoSharedObject',
    determine: (value: object) => {
      'worklet';
      return (
        value != null &&
        typeof value === 'object' &&
        '__expo_shared_object_id__' in value &&
        (value as any).__expo_shared_object_id__ !== 0
      );
    },
    pack: (value: any) => {
      'worklet';
      return {
        className: value.constructor?.name ?? 'SharedObject',
        objectId: value.__expo_shared_object_id__,
      };
    },
    unpack: (packed: any) => {
      'worklet';
      return (globalThis as any).expo.SharedObject.__wrap(packed.className, packed.objectId);
    },
  });
}

/**
 * Creates a worklet-accessible handle for a SharedObject (manual approach).
 * Use `registerSharedObjectSerializer()` instead for automatic serialization.
 */
export function getWorkletHandle(state: object, className: string): { className: string; objectId: number } {
  const objectId = (state as { __expo_shared_object_id__?: number }).__expo_shared_object_id__;
  if (objectId == null) {
    throw new Error('Expected a SharedObject with __expo_shared_object_id__');
  }
  return { className, objectId };
}
