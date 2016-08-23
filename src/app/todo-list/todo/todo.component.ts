import { Component, Input, Output, Inject, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AppState, stateAndDispatcher, state } from '../../shared/';

@Component({
  selector: 'todo',
  styles: [
    `
    div {
      cursor: pointer;
    }

    div:hover {
      color: #6699ff;
    }

    .is-completed {
      text-decoration: line-through;
      color: #ff9966;
    }

    .is-completed:hover {
      font-weight: bold;
      color: #ff9966;
    }
    `
  ],
  template: `
    <div [class.is-completed]="completed" (click)="clicked()"> {{id}}. {{ text }} </div>
  `,
})
export class TodoComponent {
  @Input() text: string;
  @Input() completed: boolean;
  @Input() id: number;
  @Output() toggle = new EventEmitter();
  
  constructor(@Inject(state) private state: Observable<AppState>) {}

  public clicked(): void {
    this.toggle.emit({id: this.id});
  }
}
