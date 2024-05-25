import {Component, Input} from '@angular/core';
import {LayoutMode} from "../../_models/layout-mode";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-layout-mode-icon',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './layout-mode-icon.component.html',
  styleUrl: './layout-mode-icon.component.scss'
})
export class LayoutModeIconComponent {
  protected readonly LayoutMode = LayoutMode;
  @Input({required: true}) layoutMode!: LayoutMode;
  /**
   * If the icon needs a bit of left padding or not for centering in the box
   */
  @Input() needsPadding: boolean = true;
}
