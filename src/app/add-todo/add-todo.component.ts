import { Component, Inject, OnInit } from '@angular/core';

import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

import { stateAndDispatcher, dispatcher, state, AppState, Action, AddTodoAction } from '../shared/';

@Component({
    selector: 'add-todo',
    template: `
        <input [(ngModel)]="text" (keydown.Enter)="addTodo()">
        <button [disabled]="isTextEmpty" (click)="addTodo()">Add Todo</button>
    `,
    providers: stateAndDispatcher,
})
export class AddTodoComponent implements OnInit {
    private nextId: number = 0;
    private text: string;

    constructor(
        @Inject(state) private state: Observable<AppState>,
        @Inject(dispatcher) private dispatcher: Observer<Action>) {
        // nothing to do here
    }

    public ngOnInit(): void {
        this.resetText();
        this.state.forEach(s => {
            this.nextId = s.todos.length;
        }); 
    }

    public get isTextEmpty(): boolean {
        return this.text === '';
    }

    public addTodo(): void {
        if (this.isTextEmpty === false) {
            const action: AddTodoAction = new AddTodoAction(this.nextId++, this.text); 

            this.dispatcher.next(action);

            this.resetText();
        }
    }

    private resetText(): void {
        this.text = '';
    }
}