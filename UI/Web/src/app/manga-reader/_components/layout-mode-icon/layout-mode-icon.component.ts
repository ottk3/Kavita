import {Component, Input} from '@angular/core';
import {LayoutMode} from "../../_models/layout-mode";

@Component({
  selector: 'app-layout-mode-icon',
  standalone: true,
  imports: [],
  templateUrl: './layout-mode-icon.component.html',
  styleUrl: './layout-mode-icon.component.scss'
})
export class LayoutModeIconComponent {
  protected readonly LayoutMode = LayoutMode;
  @Input({required: true}) layoutMode!: LayoutMode;
}
