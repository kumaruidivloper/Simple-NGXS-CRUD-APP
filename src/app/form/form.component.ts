import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { TodoState } from '../state/todo.state';
import { Select, Store } from '@ngxs/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SetSelectedTodo, UpdateTodo, AddTodo } from '../state/actions/todo.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Select(TodoState.getSelectedTodo) selectedTodo: Observable<Todo>;
  todoForm: FormGroup;
  editTodo = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
  }
  createForm() {
    this.todoForm = this.fb.group({
        id: [''],
        userId: ['', Validators.required],
        title: ['', Validators.required]
    });
}


  ngOnInit() {
    //console.log('data changed in FormComponent in ngOnInit')
    this.selectedTodo.subscribe(todo => {
      console.log('value of todo obj: ', todo)
      if (todo) {
        console.log('if todo called')
          this.todoForm.patchValue({
              id: todo.id,
              userId: todo.userId,
              title: todo.title
          });
          this.editTodo = true;
      } else {
          this.editTodo = false;
      }
  });
  }

  onSubmit(){
    if (this.editTodo) {
      this.store.dispatch(new UpdateTodo(this.todoForm.value, this.todoForm.value.id)).subscribe(() => {
          this.clearForm();
      });
  } else {
      this.store.dispatch(new AddTodo(this.todoForm.value)).subscribe(() => {
          this.clearForm();
      });
  }
  }

  clearForm() {
    this.todoForm.reset();
    this.store.dispatch(new SetSelectedTodo(null));
}

}
