import { Directive, Input, HostBinding, OnChanges } from '@angular/core';

@Directive({
  selector: '[appExpensive]',
  standalone: true
})
export class ExpensiveHighlight implements OnChanges {
  @Input('appExpensive') price?: number;
  @Input() threshold = 500;

  @HostBinding('class.expensive') isExpensive = false;

  ngOnChanges() {
    const v = Number(this.price);
    this.isExpensive = Number.isFinite(v) && v >= this.threshold;
  }
}
