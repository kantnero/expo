import { SharedObject } from 'expo-modules-core';
import type { DependencyList } from 'react';
type ToggleStateEvents = {
    isOnChange: (payload: {
        isOn: boolean;
    }) => void;
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
export declare function useToggleState(initialValue?: boolean): ToggleState;
type TextFieldStateEvents = {
    textChange: (payload: {
        text: string;
    }) => void;
    focusChange: (payload: {
        isFocused: boolean;
    }) => void;
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
export declare function useTextFieldState(initialValue?: string): TextFieldState;
/**
 * Extracts the native shared object ID from a SharedObject instance.
 * Used internally to pass SharedObject references as view props.
 */
export declare function getStateId(state?: object): number | undefined;
/**
 * Creates a shared state that is automatically cleaned up when the component unmounts.
 * Generic hook for creating any ObservableState subclass registered in the module.
 */
export declare function useSharedState<T extends InstanceType<typeof SharedObject>>(factory: () => T, deps?: DependencyList): T;
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
export declare function registerSharedObjectSerializer(): void;
/**
 * Creates a worklet-accessible handle for a SharedObject (manual approach).
 * Use `registerSharedObjectSerializer()` instead for automatic serialization.
 */
export declare function getWorkletHandle(state: object, className: string): {
    className: string;
    objectId: number;
};
export {};
//# sourceMappingURL=index.d.ts.map