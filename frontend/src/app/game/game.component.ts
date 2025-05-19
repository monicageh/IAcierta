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
    this.questionService.getRandomQuestion(this.selectedCollection).subscribe({
      next: (data: Question) => {
        this.question = data;
      },
      error: (err) => console.error('Error al obtener la pregunta', err)
    });
  }

  submitAnswer(): void {
    console.log('Respuesta enviada:', this.userAnswer);
    // Aquí se podría agregar la lógica para validar la respuesta.
    this.loadRandomQuestion();
    this.userAnswer = '';
  }

  goHome(): void {
    this.router.navigate(['']);
  }

  generateRoscoLetters(): void {
    const total = 25;
    const radius = 150; // radio en píxeles para la distribución circular
    for (let i = 0; i < total; i++) {
      const angle = (360 / total) * i;
      const rad = angle * (Math.PI / 180);
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);
      const letter = String.fromCharCode(65 + (i % 25));
      const style = `translate(${x}px, ${y}px)`;
      this.letters.push({ value: letter, style });
    }
  }
}
