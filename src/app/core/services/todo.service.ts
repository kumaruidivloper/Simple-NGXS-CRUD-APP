import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/models/todo';


@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private userUrl = 'http://localhost:3000/sampleBooks';
    constructor(private http: HttpClient) {
    }

    fetchTodos() {
        return this.http.get<Todo[]>(this.userUrl);
    }

    deleteTodo(id: number) {
        return this.http.delete(`${this.userUrl}/${id}`);
    }

    addTodo(payload: Todo) {
        return this.http.post<Todo>(`${this.userUrl}`, payload);
    }

    updateTodo(payload: Todo, id: number) {
        return this.http.put<Todo>(`${this.userUrl}/${id}`, payload);
    }
}