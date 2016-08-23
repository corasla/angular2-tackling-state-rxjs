import { OpaqueToken } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Action, ToggleTodoAction, SetVisibilityFilter, AddTodoAction } from './actions';

import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';

export const initState = new OpaqueToken('initState');
export const dispatcher = new OpaqueToken('dispatcher');
export const state = new OpaqueToken('state');

export class ToDoItem {
  constructor(public id: number, public text: string, public completed: boolean = false) {
    console.log('created on nois todo -> ', this.text, this.id);
  }
}

export class AppState {
  public todos: Array<ToDoItem>;
  public visibilityFilter;
  constructor() {
    console.log('inited!');
  }
}

export const stateAndDispatcher = [
  {
     provide: initState, 
     useValue: {todos: [], visibilityFilter: 'SHOW_ACTIVE'}
  }, 
  {
    provide: dispatcher, 
    useValue: new Subject<Action>(null)
  }, 
  {
    provide: state,
    useFactory: stateFn,
    deps: [initState, dispatcher]
  }
];

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> { 
  const combine = s => ({todos: s[0], visibilityFilter: s[1]});
  const appStateObs: Observable<AppState> = 
    todos(initState.todos, actions).   
        zip(filter(initState.visibilityFilter, actions)).
        map(combine); 
  return wrapIntoBehavior(initState, appStateObs); 
}

function wrapIntoBehavior(init, obs) { 
  const res = new BehaviorSubject(init); 
  obs.subscribe(s => res.next(s)); 
  return res; 
}

function todos(initState: any, actions: Observable<Action>): Observable<ToDoItem> { 
// function todos(initState: Todo[], actions: Observable<Action>): Observable<ToDo> { 
    return actions.scan((state, action) => { 
      if (action instanceof AddTodoAction) { 
        const newTodo = {
          id: action.todoId, 
          text: action.text, 
          completed: false
        }; 
        return [...state, newTodo]; 
      } else { 
        return state.map(t => updateTodo(t, action)); 
      } 
    }, initState); 
} 

function updateTodo(todo: ToDoItem, action: Action): ToDoItem { 
  if (action instanceof ToggleTodoAction) { 
    // merge creates a new object using 
    // the properties of the passed in objects 
    return (action.id !== todo.id) ? todo : merge(todo, {completed: !todo.completed}); 
  } else { 
    return todo; 
  } 
}

function filter(initState: string, actions: Observable<Action>): Observable<string> { 
   return actions.scan((state, action) => { 
     if (action instanceof SetVisibilityFilter) { 
       return action.filter; 
     } else { 
       return state; 
     } 
   }, initState); 
}

function merge(todo: ToDoItem, props: any): any {
  return Object.assign({}, todo, props);
}