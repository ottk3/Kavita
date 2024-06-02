import {inject, Pipe, PipeTransform} from '@angular/core';
import {ScalingOption} from "../_models/preferences/scaling-option";
import {TranslocoService} from "@ngneat/transloco";

@Pipe({
  name: 'scalingOptionText',
  standalone: true
})
export class ScalingOptionTextPipe implements PipeTransform {

  translocoService = inject(TranslocoService);
  transform(value: ScalingOption): string {
    switch (value) {
      case ScalingOption.FitToHeight:
        return this.translocoService.translate('preferences.fit-to-height');
      case ScalingOption.FitToWidth:
        return this.translocoService.translate('preferences.fit-to-width');
      case ScalingOption.Original:
        return this.translocoService.translate('preferences.original');
      case ScalingOption.Automatic:
        return this.translocoService.translate('preferences.automatic');
    }
  }

}
