import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  id?: string;
  pregunta: string;
  respuestaCorrecta: string;
  respuestaChatgpt: string;
}

export interface AnswerResult {
  correct: boolean;
  correctAnswer: string;
  playerAnswer: string;
  chatgptAnswer: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) {}

  /** 1) Arranca partida */
  startGame(lang: 'es' | 'en'): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/start/${lang}`);
  }

  /** 2) Comprueba una respuesta */
  checkAnswer(
    questionId: string,
    lang: 'es' | 'en',
    answer: string
  ): Observable<AnswerResult> {
    return this.http.post<AnswerResult>(
      `${this.baseUrl}/check`,
      { questionId, lang, answer }
    );
  }
}
