import {Component, Input} from '@angular/core';
import {ScalingIconPipe} from "../../../_pipes/scaling-icon.pipe";
import {ScalingOption} from "../../../_models/preferences/scaling-option";

@Component({
  selector: 'app-image-scaling-icon',
  standalone: true,
  imports: [
    ScalingIconPipe
  ],
  templateUrl: './image-scaling-icon.component.html',
  styleUrl: './image-scaling-icon.component.scss'
})
export class ImageScalingIconComponent {
  @Input({required: true}) imageScalingOption!: ScalingOption;
}
