import { Component, Input, Output, Inject, EventEmitter } from '@angular/core';

import { AppState, stateAndDispatcher, state } from '../shared/stateAndDispatcher';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'todo',
  template: `
    wow, so nice to be here!!
    <span> {{ text }} </span>
  `
})
export class TodoComponent {
  @Input() text: string;
  @Input() completed: boolean;
  @Output() toggle = new EventEmitter();
  
  constructor(@Inject(state) private state: Observable<AppState>) {
    console.log('Created todo component', this.text, this.completed);
  }

  ngOnInit() {
  }

}
