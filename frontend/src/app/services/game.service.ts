import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private selectedCollection: string = 'rae';

  setSelectedCollection(collection: string) {
    this.selectedCollection = collection;
  }

  getSelectedCollection(): string {
    return this.selectedCollection;
  }
}
