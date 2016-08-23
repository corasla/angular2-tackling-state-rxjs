import { Component, Inject, Input } from '@angular/core';
import { AppState, stateAndDispatcher, state, dispatcher } from '../shared/stateAndDispatcher';
import { Action, SetVisibilityFilter } from '../shared/actions';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { TodoComponent } from '../todo/todo.component';


@Component({
    moduleId: module.id,
    selector: 'filter-link',
    styles: [
      `div {
        cursor: pointer;
      }`
    ],
    template: `
        <div (click)="setVisibilityFilter()" [style.text-decoration]="textEffect | async"> {{ filter }} </div>
    `,
    directives: [TodoComponent],
})
export class FilterLink { 
  @Input() filter: string; 

  constructor(
    @Inject(dispatcher) private dispatcher: Observer<Action>, 
    @Inject(state) private state: Observable<AppState>){} 

  get textEffect() { 
    return this.state.map(s => 
      s.visibilityFilter === this.filter ? 'underline' : 'none'); 
  } 

  setVisibilityFilter() { 
    this.dispatcher.next(new SetVisibilityFilter(this.filter)); 
  } 
} 