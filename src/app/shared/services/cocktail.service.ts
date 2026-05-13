import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';

@Injectable({ providedIn: 'root' })
export class CocktailService {
  private readonly http = inject(HttpClient);
  private readonly dataUrl = 'assets/data/cocktails.json';

  getCocktails(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(this.dataUrl);
  }
}
