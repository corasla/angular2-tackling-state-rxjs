/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { TodoAppComponent } from './todo-app.component';

describe('Component: TodoApp', () => {
  it('should create an instance', () => {
    let component = new TodoAppComponent();
    expect(component).toBeTruthy();
  });
});
