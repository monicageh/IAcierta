import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private selectedLang: 'es' | 'en' | '' = '';

  setSelectedLang(lang: 'es' | 'en') {
    this.selectedLang = lang;
  }

  getSelectedLang(): 'es' | 'en' | '' {
    return this.selectedLang;
  }

  clear() {
    this.selectedLang = '';
  }
}
