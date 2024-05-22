import {Component, Input} from '@angular/core';
import {FITTING_OPTION} from "../../_models/reader-enums";
import {FittingIconPipe} from "../../../_pipes/fitting-icon.pipe";

@Component({
  selector: 'app-image-scaling-icon',
  standalone: true,
  imports: [
    FittingIconPipe
  ],
  templateUrl: './image-scaling-icon.component.html',
  styleUrl: './image-scaling-icon.component.scss'
})
export class ImageScalingIconComponent {
  @Input({required: true}) imageScalingOption!: FITTING_OPTION;
}
