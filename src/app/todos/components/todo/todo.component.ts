import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo')
  todoProps?: TodoInterface;

  @Input('isEditing')
  isEditingProps?: boolean;

  @Output('setEditingId')
  setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();

  editingText: string = '';

  @ViewChild('textInput')
  textInput?: ElementRef;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps ? this.todoProps.text : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps?.id);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todoProps ? this.todoProps.id : '');
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todoProps ? this.todoProps.id : '');
  }

  changeText(event: Event): void {
    this.editingText = (event.target as HTMLInputElement).value;
  }

  changeTodo(): void {
    this.todosService.changeTodo(
      this.todoProps ? this.todoProps.id : '',
      this.editingText
    );
    this.setEditingIdEvent.emit(null);
  }
}
