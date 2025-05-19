import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  id?: string;
  pregunta: string;
  respuestaCorrecta: string;
  respuestaChatgpt: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) {}

  getRandomQuestion(collection: string): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/random/${collection}`);
  }
}
