import { ReactNode } from 'react';
import { type ColorValue } from 'react-native';
import { type ModifierConfig } from '../../types';
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
/**
 * Anchor content for the dropdown menu box (e.g. a `TextInput` or `Text`).
 */
declare function Anchor(props: {
    children: ReactNode;
}): import("react").JSX.Element;
/**
 * Container for items displayed in the dropdown menu.
 * Children should be `DropdownMenuItem` components.
 */
declare function Items(props: {
    children: ReactNode;
}): import("react").JSX.Element;
/**
 * A Material 3 `ExposedDropdownMenuBox`.
 *
 * Use `ExposedDropdownMenuBox.Anchor` to provide the anchor content (e.g. a `TextInput` or `Text`).
 * Use `ExposedDropdownMenuBox.Items` to wrap `DropdownMenuItem` children.
 */
declare function ExposedDropdownMenuBoxComponent(props: ExposedDropdownMenuBoxProps): import("react").JSX.Element;
export declare const ExposedDropdownMenuBox: typeof ExposedDropdownMenuBoxComponent & {
    Anchor: typeof Anchor;
    Items: typeof Items;
};
export {};
//# sourceMappingURL=index.d.ts.map