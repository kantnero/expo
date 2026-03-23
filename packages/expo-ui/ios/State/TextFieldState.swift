// Copyright 2025-present 650 Industries. All rights reserved.

import ExpoModulesCore
import SwiftUI

/**
 Observable state for TextField, created from JavaScript and observed by SwiftUI.
 Replaces the TextFieldManager + AsyncFunction("setText") pattern with direct property access.
 */
internal final class TextFieldState: ObservableState {
  @Published var text: String = "" {
    didSet {
      if oldValue != text {
        safeEmit(event: "textChange", arguments: ["text": text])
      }
    }
  }

  @Published var isFocused: Bool = false {
    didSet {
      if oldValue != isFocused {
        safeEmit(event: "focusChange", arguments: ["isFocused": isFocused])
      }
    }
  }

#if !os(tvOS)
  @Published var _selection: Any?

  @available(iOS 18.0, macOS 15.0, *)
  var selection: SwiftUI.TextSelection? {
    get { _selection as? SwiftUI.TextSelection }
    set { _selection = newValue }
  }
#endif
}
