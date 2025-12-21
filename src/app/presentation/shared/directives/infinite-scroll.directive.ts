import { Directive, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  @Output() scrolled = new EventEmitter<void>();

  private element = inject(ElementRef);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    fromEvent(this.element.nativeElement, 'scroll')
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.onScroll());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onScroll(): void {
    const element = this.element.nativeElement;
    const threshold = 100;
    
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - threshold) {
      this.scrolled.emit();
    }
  }
}