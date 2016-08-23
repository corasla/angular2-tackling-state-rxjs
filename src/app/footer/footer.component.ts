import { Component } from '@angular/core';
import { FilterLink } from '../filter-link/';

@Component({
    moduleId: module.id,
    selector: 'app-footer',
    template: `
        <filter-link filter="SHOW_ALL">All</filter-link>
        <filter-link filter="SHOW_ACTIVE">Active</filter-link>
        <filter-link filter="SHOW_COMPLETED">Completed</filter-link>
    `,
    directives: [ FilterLink ]
})
export class FooterComponent {
    constructor() {

    }
}