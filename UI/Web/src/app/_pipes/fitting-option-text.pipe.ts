import {inject, Pipe, PipeTransform} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {LayoutMode} from "../manga-reader/_models/layout-mode";
import {FITTING_OPTION} from "../manga-reader/_models/reader-enums";

@Pipe({
  name: 'fittingOptionText',
  standalone: true
})
export class FittingOptionTextPipe implements PipeTransform {

  translocoService = inject(TranslocoService);
  transform(value: FITTING_OPTION): string {
    switch (value) {
      case FITTING_OPTION.WIDTH:
        return this.translocoService.translate('preferences.fit-to-width');
      case FITTING_OPTION.HEIGHT:
        return this.translocoService.translate('preferences.fit-to-height');
      case FITTING_OPTION.ORIGINAL:
        return this.translocoService.translate('preferences.original');
      default:
        return value + '';
    }
  }

}
