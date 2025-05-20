import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  selectLanguage(lang: 'es' | 'en') {
    this.gameService.setSelectedLang(lang);
    this.router.navigate(['/game']);
  }
}
