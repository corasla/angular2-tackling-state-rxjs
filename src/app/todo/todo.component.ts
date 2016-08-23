import { Component, Input, Output, Inject, EventEmitter } from '@angular/core';

import { AppState, stateAndDispatcher, state } from '../shared/stateAndDispatcher';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'todo',
  styles: [
    `
    div {
      cursor: pointer;
    }

    div:hover {
      text-decoration: underline;
    }
    `
  ],
  template: `
    <div [style.text-decoration]="textEffect" (click)="clicked()"> {{id}}. {{ text }} </div>
  `
})
export class TodoComponent {
  @Input() text: string;
  @Input() completed: boolean;
  @Input() id: number;
  @Output() toggle = new EventEmitter();
  
  constructor(@Inject(state) private state: Observable<AppState>) {
  }

  public clicked(): void {
    console.log('gonna send -> ', this.id);
    this.toggle.emit({id: this.id});
  }

  get textEffect() { 
    return this.completed === true ? 'line-through' : 'none'; 
  } 
}
