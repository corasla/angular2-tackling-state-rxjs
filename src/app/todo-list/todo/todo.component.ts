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
      color: #ffffff;
      background: #000000;
    }
    `
  ],
  template: `
    <div [style.text-decoration]="textEffect" (click)="clicked()"> {{id}}. {{ text }} </div>
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

  public get textEffect() { 
    return this.completed === true ? 'line-through' : 'none'; 
  } 
}
