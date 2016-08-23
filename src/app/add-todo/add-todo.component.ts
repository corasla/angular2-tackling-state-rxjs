import { Component, Inject } from '@angular/core';
import { stateAndDispatcher, dispatcher, Action, AddTodoAction } from '../shared';
import { Observer } from 'rxjs/Observer';
@Component({
    selector: 'add-todo',
    template: `
        <input #val>
        <button (click)="addTodo(val.value)">Add Todo</button>
    `,
    providers: stateAndDispatcher
})
export class AddTodoComponent {
    private nextId: number = 0;
    constructor(@Inject(dispatcher) private dispatcher: Observer<Action>) {}

    addTodo(value: string): void {
        console.log('adding -> ', value, this.nextId);
        this.dispatcher.next(new AddTodoAction(this.nextId++, value));
    }
}