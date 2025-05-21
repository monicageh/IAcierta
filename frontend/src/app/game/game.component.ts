// src/app/game/game.component.ts

import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import {
  QuestionService,
  Question,
  AnswerResult
} from '../services/question.service';

interface Letter {
  index: number;    // índice en el array questions (0…24)
  value: string;    // (index+1).toString()
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

  // flujo de preguntas
  questions: Question[] = [];
  currentIndex = 0;
  question: Question | null = null;

  // estado de cada pregunta: 'correct' | 'incorrect' | null
  answerStatus: ('correct'|'incorrect'|null)[] = [];

  // rosco
  letters: Letter[] = [];

  // respuesta / feedback
  userAnswer = '';
  showFeedback = false;
  isCorrect = false;
  feedback?: AnswerResult;

  // idioma
  lang: 'es'|'en' = 'es';

  // propiedades de puntuación
  playerScore = 0;
  chatgptScore = 0;

  constructor(
    private router: Router,
    private gameService: GameService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    // 1) Recuperar idioma o volver a home
    this.lang = this.gameService.getSelectedLang() as 'es'|'en';
    if (!this.lang) {
      this.router.navigate(['/']);
      return;
    }

    // 2) Cargar 25 preguntas aleatorias
    this.questionService.startGame(this.lang).subscribe(list => {
      this.questions = list;
      this.answerStatus = new Array(this.questions.length).fill(null);
      this.currentIndex = 0;
      this.playerScore = 0;
      this.loadCurrentQuestion();
      this.generateRoscoLetters();
    });
  }

  ngAfterViewInit(): void {
    // recalcular posiciones si cambia tamaño
    this.generateRoscoLetters();
  }

  @HostListener('window:resize')
  onResize() {
    this.generateRoscoLetters();
  }

  private loadCurrentQuestion() {
    this.question = this.questions[this.currentIndex];
    this.userAnswer = '';
    this.showFeedback = false;
  }

  /** Al pulsar “Comprobar” */
  checkAnswer(): void {
    if (!this.question) return;
    this.questionService
      .checkAnswer(this.question.id!, this.lang, this.userAnswer)
      .subscribe(res => {
        this.feedback = res;
        this.isCorrect = res.correct;
        if (res.correct) {
        this.playerScore++;
      }
      if (res.chatgptCorrect) {
        this.chatgptScore++;
      }
        // guardar estado
        this.answerStatus[this.currentIndex] = res.correct ? 'correct' : 'incorrect';
        this.showFeedback = true;
      });
  }

  /** Al pulsar “Siguiente pregunta” */
  nextQuestion(): void {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.loadCurrentQuestion();
    } else {
      this.exitGame();
    }
  }

  /** Al pulsar “Salir” */
  exitGame(): void {
    this.gameService.clear();
    this.playerScore = 0;
    this.chatgptScore = 0;
    this.router.navigate(['/']);
  }

  /** Calcula la posición de cada círculo */
  private generateRoscoLetters(): void {
    const rect = this.roscoRef.nativeElement.getBoundingClientRect();
    const outer = Math.min(rect.width, rect.height);
    const center = outer / 2;
    const circleSize = outer * 0.1;
    const radius = center - circleSize / 2;
    const total = this.questions.length;

    this.letters = [];
    for (let i = 0; i < total; i++) {
      const angle = (360 / total) * i - 90;
      const rad = angle * Math.PI / 180;
      const x = center + radius * Math.cos(rad) - circleSize / 2;
      const y = center + radius * Math.sin(rad) - circleSize / 2;
      this.letters.push({ index: i, value: (i+1).toString(), x, y, size: circleSize });
    }
  }

  /** Devuelve sólo la parte de la pregunta tras el primer “:” */
  get questionBody(): string {
    if (!this.question) { return ''; }
    const text = this.question.pregunta || '';
    const idx = text.indexOf(':');
    // si hay “:”, devolvemos lo que viene después, quitando espacios
    return idx >= 0
      ? text.substring(idx + 1).trim()
      : text;
  }

}
