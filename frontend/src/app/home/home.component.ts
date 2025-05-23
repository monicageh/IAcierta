// src/app/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { GameService }       from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    // opcionalmente limpiar idioma previo
    this.gameService.clear();
  }

  selectLang(lang: 'es'|'en'): void {
    // guardamos el idioma y navegamos a /game
    this.gameService.setSelectedLang(lang);
    this.router.navigate(['/game']);
  }
}
