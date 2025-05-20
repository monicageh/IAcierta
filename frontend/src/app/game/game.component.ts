// frontend/src/app/game/game.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { QuestionService, Question } from '../services/question.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  question: Question | null = null;
  userAnswer: string = '';
  selectedCollection: string = '';
  letters: { value: string; style: string }[] = [];
  showFeedback = false;
  isCorrect = false;

  constructor(
    private router: Router,
    private gameService: GameService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.selectedCollection = this.gameService.getSelectedCollection();
    this.loadRandomQuestion();
    this.generateRoscoLetters();
  }

  loadRandomQuestion(): void {
    this.questionService.getRandomQuestion(this.selectedCollection)
      .subscribe({
        next: (data: Question) => this.question = data,
        error: (err) => console.error('Error al obtener la pregunta', err)
      });
  }

  submitAnswer(): void {
    if (!this.question) return;
    this.isCorrect = this.userAnswer.trim().toLowerCase()
      === this.question.respuestaCorrecta.trim().toLowerCase();
    this.showFeedback = true;
  }

  nextQuestion(): void {
    this.loadRandomQuestion();
    this.userAnswer = '';
    this.showFeedback = false;
  }

  goHome(): void {
    this.router.navigate(['']);
  }

  generateRoscoLetters(): void {
    const total = 25;
    const radius = 150;
    this.letters = [];
    for (let i = 0; i < total; i++) {
      const angle = (360 / total) * i - 90;  // arrancamos arriba y avanzamos CW
      const rad = angle * Math.PI / 180;
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);
      this.letters.push({
        value: (i + 1).toString(),
        style: `translate(${x}px, ${y}px)`
      });
    }
  }
}
