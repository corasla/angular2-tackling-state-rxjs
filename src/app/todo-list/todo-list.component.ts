import { Component, Inject } from '@angular/core';
import { AppState, stateAndDispatcher, state, dispatcher, ToDoItem } from '../shared/stateAndDispatcher';
import { Action, ToggleTodoAction } from '../shared/actions';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { TodoComponent } from '../todo/todo.component';


@Component({
    selector: 'todo-list',
    template: `
        <todo *ngFor="let t of filtered | async" 
                [text]="t.text" 
                [completed]="t.completed"
                [id]="t.id"
                (toggle)="emitToggle($event)"></todo>
    `,
    directives: [TodoComponent],
    providers: stateAndDispatcher
})
export class TodoList {
    constructor(@Inject(state) private state: Observable<AppState>,
                @Inject(dispatcher) private dispatcher: Observer<Action>) {
    }

    get filtered() {
        return this.state.map(s => this.getVisibleTodos(s.todos, s.visibilityFilter));
    }

    private getVisibleTodos(todoList: Array<ToDoItem>, visibilityFilter: string): Array<ToDoItem> {
        let items = [];
        todoList.forEach(item => {
            let ok: boolean = false;
            switch (visibilityFilter) {
                case 'SHOW_ALL':
                    ok = true;
                    break;
                case 'SHOW_ACTIVE':
                    ok = item.completed === false;
                    break;
                case 'SHOW_COMPLETED':
                    ok = item.completed === true;
                    break;
                default:
                    ok = false;
            }

            if (ok) {
                items.push(item);
            }
        });

        return items;
    }

    emitToggle(data) {
        this.dispatcher.next(new ToggleTodoAction(data.id));
    }
}