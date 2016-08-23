import { Component, Inject } from '@angular/core';
import { AppState, stateAndDispatcher, state } from './shared/stateAndDispatcher';
import { Observable } from 'rxjs/Observable';

import { TodoList} from './todo-list';

import { FooterComponent } from './footer/';
import { AddTodoComponent } from './add-todo/';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
    {{title}}
    <add-todo></add-todo>
    <todo-list></todo-list>
    <app-footer></app-footer> 
  `,
  directives: [TodoList,
              AddTodoComponent,
              FooterComponent],
  providers: stateAndDispatcher
})
export class AppComponent {
  title = 'app works!';

  constructor(@Inject(state) private state: Observable<AppState>) {
    console.log('alive and kicking -> ', state);
  }
}
