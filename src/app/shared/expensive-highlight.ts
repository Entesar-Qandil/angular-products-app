import { Directive } from '@angular/core';

@Directive({
  selector: '[appExpensiveHighlight]'
})
export class ExpensiveHighlight {

  constructor() { }

}
