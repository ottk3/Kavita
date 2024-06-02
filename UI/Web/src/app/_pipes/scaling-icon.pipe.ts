import { Pipe, PipeTransform } from '@angular/core';
import { FITTING_OPTION } from '../manga-reader/_models/reader-enums';
import {ScalingOption} from "../_models/preferences/scaling-option";

@Pipe({
  name: 'scalingIcon',
  pure: true,
  standalone: true,
})
export class ScalingIconPipe implements PipeTransform {

  transform(fit: ScalingOption): string {
    switch(fit) {
      case ScalingOption.FitToHeight:
        return 'fa fa-arrows-alt-v';
      case ScalingOption.FitToWidth:
        return 'fa fa-arrows-alt-h';
      case ScalingOption.Original:
        return 'fa fa-expand-arrows-alt';
    }
    return '';
  }

}
