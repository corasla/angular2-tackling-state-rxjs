import { Component, OnInit } from '@angular/core';

import { stateAndDispatcher } from '../shared/stateAndDispatcher';

@Component({
  moduleId: module.id,
  selector: 'todo-app',
  templateUrl: 'todo-app.component.html',
  styleUrls: ['todo-app.component.css'],
  providers: [stateAndDispatcher]
})
export class TodoAppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
