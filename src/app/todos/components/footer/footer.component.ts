import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  noTodosClass$: Observable<boolean>;
  showClearCompleted$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemLeftText$: Observable<string>;
  filterEnum = FilterEnum;
  filter$: Observable<FilterEnum>;

  constructor(private todosService: TodosService) {
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.itemLeftText$ = this.activeCount$.pipe(
      map(
        (activeCount) =>
          `item${activeCount !== 1 ? 's' : ''} ativo${
            activeCount !== 1 ? 's' : ''
          }`
      )
    );
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.showClearCompleted$ = this.todosService.todos$.pipe(
      map((todos) =>
        todos.length > 0 &&
        todos.filter((todo) => todo.isCompleted === true).length > 0
          ? false
          : true
      )
    );
    this.filter$ = this.todosService.filter$;
  }

  changeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filter);
  }

  clearCompleted(): void {
    this.todosService.clearCompleted();
  }
}
