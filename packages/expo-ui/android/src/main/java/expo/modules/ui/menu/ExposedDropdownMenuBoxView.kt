package expo.modules.ui.menu

import android.graphics.Color
import androidx.compose.foundation.layout.Box
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuAnchorType
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.MenuDefaults
import androidx.compose.runtime.Composable
import expo.modules.kotlin.views.ComposeProps
import expo.modules.kotlin.views.FunctionalComposableScope
import expo.modules.ui.ModifierList
import expo.modules.ui.ModifierRegistry
import expo.modules.ui.composeOrNull
import expo.modules.ui.findChildSlotView
import expo.modules.ui.renderSlot

data class ExposedDropdownMenuBoxProps(
  val expanded: Boolean = false,
  val containerColor: Color? = null,
  val modifiers: ModifierList = emptyList()
) : ComposeProps

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FunctionalComposableScope.ExposedDropdownMenuBoxContent(
  props: ExposedDropdownMenuBoxProps,
  onExpandedChange: (Boolean) -> Unit
) {
  val itemsSlotView = findChildSlotView(view, "items")
  val anchorSlotView = findChildSlotView(view, "anchor")

  ExposedDropdownMenuBox(
    expanded = props.expanded,
    onExpandedChange = onExpandedChange,
    modifier = ModifierRegistry.applyModifiers(props.modifiers, appContext, composableScope, globalEventDispatcher)
  ) {
    Box(modifier = androidx.compose.ui.Modifier.menuAnchor(ExposedDropdownMenuAnchorType.PrimaryNotEditable)) {
      anchorSlotView?.renderSlot()
    }

    ExposedDropdownMenu(
      expanded = props.expanded,
      onDismissRequest = { onExpandedChange(false) },
      containerColor = props.containerColor.composeOrNull ?: MenuDefaults.containerColor
    ) {
      itemsSlotView?.renderSlot()
    }
  }
}
