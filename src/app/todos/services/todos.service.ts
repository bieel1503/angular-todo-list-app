import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo.interface';

@Injectable()
export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(text: string): void {
    const todo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };

    const updatedTodos = [...this.todos$.getValue(), todo];
    this.todos$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean): void {
    const updated = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updated);
  }

  changeFilter(filter: FilterEnum): void {
    this.filter$.next(filter);
  }

  changeTodo(id: string, text: string): void {
    const updated = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });

    this.todos$.next(updated);
  }

  toggleTodo(id: string): void {
    const updated = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });

    this.todos$.next(updated);
  }

  removeTodo(id: string): void {
    const updated = this.todos$.getValue().filter((todo) => todo.id !== id);
    this.todos$.next(updated);
  }
}
