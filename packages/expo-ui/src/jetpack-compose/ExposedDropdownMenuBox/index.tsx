import { requireNativeView } from 'expo';
import { ReactNode } from 'react';
import { type ColorValue, NativeSyntheticEvent } from 'react-native';

import { type ModifierConfig } from '../../types';
import { createViewModifierEventListener } from '../modifiers/utils';

const NativeView: React.ComponentType<NativeExposedDropdownMenuBoxProps> = requireNativeView(
  'ExpoUI',
  'ExposedDropdownMenuBoxView'
);

const SlotNativeView: React.ComponentType<{
  slotName: string;
  children: React.ReactNode;
}> = requireNativeView('ExpoUI', 'SlotView');

export type ExposedDropdownMenuBoxProps = {
  /**
   * Whether the dropdown menu is expanded (visible).
   */
  expanded: boolean;
  /**
   * Callback when the expanded state changes (for example, tapping the field or dismissing the menu).
   */
  onExpandedChange?: (expanded: boolean) => void;
  /**
   * Background color of the dropdown menu.
   */
  containerColor?: ColorValue;
  /**
   * Modifiers for the component.
   */
  modifiers?: ModifierConfig[];
  /**
   * Children — should contain `ExposedDropdownMenuBox.Anchor` and `ExposedDropdownMenuBox.Items` with `DropdownMenuItem` children.
   */
  children?: ReactNode;
};

type NativeExposedDropdownMenuBoxProps = Omit<
  ExposedDropdownMenuBoxProps,
  'onExpandedChange' | 'children'
> & {
  onExpandedChange?: (event: NativeSyntheticEvent<{ value: boolean }>) => void;
  children?: ReactNode;
};

/**
 * Anchor content for the dropdown menu box (e.g. a `TextInput` or `Text`).
 */
function Anchor(props: { children: ReactNode }) {
  return <SlotNativeView slotName="anchor">{props.children}</SlotNativeView>;
}

/**
 * Container for items displayed in the dropdown menu.
 * Children should be `DropdownMenuItem` components.
 */
function Items(props: { children: ReactNode }) {
  return <SlotNativeView slotName="items">{props.children}</SlotNativeView>;
}

/**
 * A Material 3 `ExposedDropdownMenuBox`.
 *
 * Use `ExposedDropdownMenuBox.Anchor` to provide the anchor content (e.g. a `TextInput` or `Text`).
 * Use `ExposedDropdownMenuBox.Items` to wrap `DropdownMenuItem` children.
 */
function ExposedDropdownMenuBoxComponent(props: ExposedDropdownMenuBoxProps) {
  const { modifiers, onExpandedChange, children, ...restProps } = props;
  return (
    <NativeView
      modifiers={modifiers}
      {...(modifiers ? createViewModifierEventListener(modifiers) : undefined)}
      {...restProps}
      onExpandedChange={
        onExpandedChange ? ({ nativeEvent: { value } }) => onExpandedChange(value) : undefined
      }>
      {children}
    </NativeView>
  );
}

export const ExposedDropdownMenuBox = Object.assign(ExposedDropdownMenuBoxComponent, {
  Anchor,
  Items,
});
