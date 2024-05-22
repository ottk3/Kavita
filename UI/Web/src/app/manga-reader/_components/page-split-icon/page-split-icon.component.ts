import {Component, inject, Input} from '@angular/core';
import {LayoutMode} from "../../_models/layout-mode";
import {PageSplitOption} from "../../../_models/preferences/page-split-option";
import { MangaReaderService } from '../../_service/manga-reader.service';

@Component({
  selector: 'app-page-split-icon',
  standalone: true,
  imports: [],
  templateUrl: './page-split-icon.component.html',
  styleUrl: './page-split-icon.component.scss'
})
export class PageSplitIconComponent {
  private mangaReaderService = inject(MangaReaderService);

  @Input({required: true}) pageSplitOption!: PageSplitOption;

  get SplitIconClass() {
    if (this.mangaReaderService.isSplitLeftToRight(this.pageSplitOption)) {
      return 'left-side';
    } else if (this.mangaReaderService.isNoSplit(this.pageSplitOption)) {
      return 'none';
    }
    return 'right-side';
  }
}
