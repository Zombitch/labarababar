import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CocktailService } from '../../shared/services/cocktail.service';
import { Cocktail } from '../../shared/models/cocktail.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly cocktailService = inject(CocktailService);

  protected readonly featuredCocktails = signal<Cocktail[]>([]);

  ngOnInit(): void {
    this.cocktailService.getCocktails().subscribe((cocktails) => {
      // One representative cocktail per category
      const categories = ['signature', 'warrior', 'doux', 'special', 'mystere', 'classique'] as const;
      const picks = categories
        .map((cat) => cocktails.find((c) => c.category === cat))
        .filter((c): c is Cocktail => c !== undefined)
        .slice(0, 3);
      this.featuredCocktails.set(picks);
    });
  }
}
