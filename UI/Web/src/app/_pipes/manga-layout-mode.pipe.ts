import {inject, Pipe, PipeTransform} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {LayoutMode} from "../manga-reader/_models/layout-mode";

@Pipe({
  name: 'mangaLayoutMode',
  standalone: true
})
export class MangaLayoutModePipe implements PipeTransform {

  translocoService = inject(TranslocoService);
  transform(value: LayoutMode): string {
    switch (value) {
      case LayoutMode.Single:
        return this.translocoService.translate('preferences.single');
      case LayoutMode.Double:
        return this.translocoService.translate('preferences.double');
      case LayoutMode.DoubleReversed:
        return this.translocoService.translate('preferences.double-manga');
      case LayoutMode.Webtoon:
        return this.translocoService.translate('preferences.webtoon');
      default:
        return value + '';
    }
  }

}
