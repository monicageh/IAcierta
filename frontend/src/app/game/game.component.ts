// frontend/src/app/game/game.component.ts

import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { QuestionService, Question } from '../services/question.service';

interface Letter {
  value: string;
  x: number;
  y: number;
  size: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChild('roscoRef') roscoRef!: ElementRef<HTMLDivElement>;

  question: Question | null = null;
  userAnswer = '';
  selectedCollection = '';
  letters: Letter[] = [];
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
  }

  ngAfterViewInit(): void {
    this.generateRoscoLetters();
  }

  @HostListener('window:resize')
  onResize() {
    this.generateRoscoLetters();
  }

  loadRandomQuestion(): void {
    this.questionService.getRandomQuestion(this.selectedCollection)
      .subscribe({
        next: q => this.question = q,
        error: e => console.error('Error al obtener pregunta', e)
      });
  }

  /** Se llama al apretar “Comprobar” */
  checkAnswer(): void {
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

  private generateRoscoLetters(): void {
    if (!this.roscoRef) return;
    const rect = this.roscoRef.nativeElement.getBoundingClientRect();
    const outer = Math.min(rect.width, rect.height);
    const center = outer / 2;
    const circleSize = outer * 0.1;
    const radius = center - circleSize / 2;
    const total = 25;

    this.letters = [];
    for (let i = 0; i < total; i++) {
      const angle = (360 / total) * i - 90;
      const rad = angle * Math.PI / 180;
      const x = center + radius * Math.cos(rad) - circleSize / 2;
      const y = center + radius * Math.sin(rad) - circleSize / 2;
      this.letters.push({ value: (i + 1).toString(), x, y, size: circleSize });
    }
  }
}
