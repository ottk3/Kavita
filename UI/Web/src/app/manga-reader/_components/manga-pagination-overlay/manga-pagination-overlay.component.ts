import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ReadingDirection} from "../../../_models/preferences/reading-direction";
import {ReaderMode} from "../../../_models/preferences/reader-mode";
import {NgStyle} from "@angular/common";
import {Observable} from "rxjs";
import {ReaderSetting} from "../../_models/reader-setting";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {tap} from "rxjs/operators";
import {TranslocoDirective} from "@ngneat/transloco";
import {KeyDirection} from "../manga-reader/manga-reader.component";
import {LayoutMode} from "../../_models/layout-mode";
import {ScalingOption} from "../../../_models/preferences/scaling-option";

@Component({
  selector: 'app-manga-pagination-overlay',
  standalone: true,
  imports: [
    NgStyle,
    TranslocoDirective
  ],
  templateUrl: './manga-pagination-overlay.component.html',
  styleUrl: './manga-pagination-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MangaPaginationOverlayComponent implements OnInit {

  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly ReadingDirection = ReadingDirection;
  protected readonly ReaderMode = ReaderMode;
  protected readonly KeyDirection = KeyDirection;

  @Input({required: true}) readingArea: HTMLDivElement | undefined;
  @Input({required: true}) readerSettings$!: Observable<ReaderSetting>;
  @Input({required: true}) showClickOverlay$!: Observable<boolean>;
  /**
   * Next page triggered. May include an event
   */
  @Output() next = new EventEmitter<any>();
  /**
   * Previous page triggered. May include an event
   */
  @Output() prev = new EventEmitter<any>();

  readerMode!: ReaderMode;
  readingDirection!: ReadingDirection;
  layoutMode!: LayoutMode;
  scalingOption!: ScalingOption;
  showClickOverlay: boolean = true;

  get RightPaginationOffset() {
    if (this.readerMode === ReaderMode.LeftRight && this.scalingOption !== ScalingOption.FitToWidth) {
      return (this.readingArea?.scrollLeft || 0) * -1;
    }
    return 0;
  }

  ngOnInit() {
    this.readerSettings$.pipe(
      tap(settings => {
        this.readerMode = settings.readerMode;
        this.readingDirection = settings.readingDirection;
        this.layoutMode = settings.layoutMode;
        this.scalingOption = settings.scalingOption;

        console.log('pagination readerMode: ', this.readerMode);
        this.cdRef.markForCheck();
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();

    this.showClickOverlay$.pipe(
      tap(showClickOverlay => {
        this.showClickOverlay = showClickOverlay;
        this.cdRef.markForCheck();
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  clickOverlayClass(side: 'right' | 'left') {
    if (!this.showClickOverlay) {
      return '';
    }

    if (this.readingDirection === ReadingDirection.LeftToRight) {
      return side === 'right' ? 'highlight' : 'highlight-2';
    }
    return side === 'right' ? 'highlight-2' : 'highlight';
  }

  handlePageChange(event: any, direction: KeyDirection) {
    if (this.layoutMode === LayoutMode.Webtoon) {
      if (direction === KeyDirection.Right) {
        this.next.emit(event);
      } else {
        this.prev.emit(event);
      }
      return;
    }
    if (direction === KeyDirection.Right) {
      this.readingDirection === ReadingDirection.LeftToRight ? this.next.emit(event) : this.prev.emit(event);
    } else if (direction === KeyDirection.Left) {
      this.readingDirection === ReadingDirection.LeftToRight ? this.prev.emit(event) : this.next.emit(event);
    }
  }

}
