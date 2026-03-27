# Daily Learning Digest — 2026-03-27

> No Nishan-authored commits found in the last 3 days, so tips are based on patterns observed in `packages/expo-ui/` code you work with daily.

---

## iOS Tips (Swift / SwiftUI)

### 1. Upgrade `onChange(of:)` to the iOS 17 two-parameter closure

The codebase uses the single-parameter `onChange(of:perform:)` form throughout (e.g. `SliderView.swift`, `BottomSheetView.swift`), which is deprecated in iOS 17. The new form gives you both `oldValue` and `newValue`, eliminating the need to store previous values in `@State`.

```swift
// Old (deprecated in iOS 17)
.onChange(of: props.value) { newValue in ... }

// New — no extra @State needed for comparisons
.onChange(of: props.value) { oldValue, newValue in
    guard oldValue != newValue else { return }
    ...
}
```

[Docs](https://developer.apple.com/documentation/swiftui/view/onchange(of:initial:_:)-4psgg)

---

### 2. Replace `ObservableObject` + `@ObservedObject` with `@Observable`

All props classes (e.g. `BottomSheetProps`, `SliderProps`) use `ObservableObject`. The `@Observable` macro (iOS 17+) is simpler, eliminates `@Published`, and only triggers redraws for properties actually read — reducing unnecessary recomposition.

```swift
// Before
final class BottomSheetProps: UIBaseViewProps {
    @Published var isPresented: Bool = false
}
struct BottomSheetView: View {
    @ObservedObject var props: BottomSheetProps
}

// After (iOS 17+)
@Observable final class BottomSheetProps: UIBaseViewProps {
    var isPresented: Bool = false  // no @Published needed
}
struct BottomSheetView: View {
    var props: BottomSheetProps  // no @ObservedObject needed
}
```

[Docs](https://developer.apple.com/documentation/observation/observable())

---

### 3. Use `onGeometryChange` instead of `GeometryReader` + `PreferenceKey` for size reading

`BottomSheetView.swift` uses a `PreferenceKey` + `GeometryReader` pattern to read child sizes. iOS 18 adds `onGeometryChange(for:of:action:)`, which achieves the same result with far less boilerplate.

```swift
// iOS 18+ replacement for the entire ReadSizeModifier + SizePreferenceKey stack
content
    .onGeometryChange(for: CGSize.self, of: \.size) { newSize in
        childrenSize = newSize
    }
```

[Docs](https://developer.apple.com/documentation/swiftui/view/ongeometrychange(for:of:action:)-7ojoo)

---

### 4. Use `#if compiler(>=6.2)` only when needed — prefer `#available` for runtime checks

`GlassEffectContainerView.swift` wraps iOS 26 APIs with both `if #available(iOS 26.0, ...)` and `#if compiler(>=6.2)`. The compiler guard is only necessary when the API doesn't exist in older SDKs at all. If you build with Xcode 26, `#available` alone is sufficient and cleaner for most cases.

---

## Android Tips (Kotlin / Jetpack Compose)

### 1. Prefer `mutableFloatStateOf` / `mutableIntStateOf` over `mutableStateOf<Float>`

The `SliderView.kt` correctly uses `mutableFloatStateOf`, but some other views still use generic `mutableStateOf` for primitives. Specialized state holders skip boxing and are measurably more efficient in hot recomposition paths.

```kotlin
// Avoid — boxes Float on every read/write
var value by remember { mutableStateOf(0f) }

// Prefer — no boxing
var value by remember { mutableFloatStateOf(0f) }
```

[Docs](https://developer.android.com/reference/kotlin/androidx/compose/runtime/package-summary#mutableFloatStateOf(kotlin.Float))

---

### 2. Understand when `currentRecomposeScope` is actually needed

`LazyColumnView.kt` stores `currentRecomposeScope` and manually triggers recomposition when children are added/removed. This is a valid escape hatch for View-system children that Compose can't observe. But inside pure `@Composable` functions, mutating `MutableState` is always sufficient — avoid reaching for `currentRecomposeScope` there as it tightly couples imperative and declarative worlds.

---

### 3. Use `animateContentSize()` for automatic layout animations

`ModifierRegistry.kt` already imports `animateContentSize`. This modifier animates any size change on a composable automatically — useful for sheet content that grows as children are added, without manual animation code.

```kotlin
Box(
    modifier = Modifier.animateContentSize(
        animationSpec = spring(stiffness = Spring.StiffnessMediumLow)
    )
) {
    Children(...)
}
```

[Docs](https://developer.android.com/reference/kotlin/androidx/compose/animation/package-summary#(androidx.compose.ui.Modifier).animateContentSize(androidx.compose.animation.core.FiniteAnimationSpec,kotlin.Function2))

---

### 4. Map `ModalBottomSheetProperties` `shouldDismissOnClickOutside` carefully

In `BottomSheetView.kt`, `shouldDismissOnClickOutside` is passed directly to `ModalBottomSheetProperties`. Note that in Material3 1.3+, this property was renamed to `isFocusable` on some APIs — verify behavior on Android 15 devices where predictive back gesture interacts with bottom sheet dismissal in non-obvious ways. Test with `BackHandler` if the sheet has form fields.

---

*Generated by Claude Code — expo/expo*
