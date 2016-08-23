import { Component } from '@angular/core';

import { FilterLink } from './filter-link/';

@Component({
    moduleId: module.id,
    selector: 'filter-selector',
    template: `
        <filter-link filter="SHOW_ALL">All</filter-link>
        <filter-link filter="SHOW_ACTIVE">Active</filter-link>
        <filter-link filter="SHOW_COMPLETED">Completed</filter-link>
    `,
    directives: [FilterLink],
})
export class FilterSelectorComponent {
    constructor() {
        // nothing to do here
    }
}