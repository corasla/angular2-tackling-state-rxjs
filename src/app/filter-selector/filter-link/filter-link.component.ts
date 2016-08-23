import { Component, Inject, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import { AppState, stateAndDispatcher, state, dispatcher } from '../../shared/';
import { Action, SetVisibilityFilter } from '../../shared/actions/';

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
})
export class FilterLink { 
  @Input() public filter: string; 

  constructor(@Inject(dispatcher) private dispatcher: Observer<Action>, 
              @Inject(state) private state: Observable<AppState>) {
        // nothing to do here
    } 

  public get textEffect() { 
    return this.state.map(s => 
      s.visibilityFilter === this.filter ? 'underline' : 'none'); 
  } 

  public setVisibilityFilter() {
    const action: SetVisibilityFilter = new SetVisibilityFilter(this.filter);

    this.dispatcher.next(action); 
  } 
} 