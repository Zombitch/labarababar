import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { CocktailService } from '../../shared/services/cocktail.service';
import { Cocktail, CocktailCategory } from '../../shared/models/cocktail.model';

interface CategoryFilter {
  readonly value: CocktailCategory | 'all';
  readonly label: string;
  readonly emoji: string;
}

@Component({
  selector: 'app-cocktails',
  standalone: true,
  imports: [],
  templateUrl: './cocktails.component.html',
  styleUrl: './cocktails.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailsComponent implements OnInit {
  private readonly cocktailService = inject(CocktailService);

  protected readonly allCocktails = signal<Cocktail[]>([]);
  protected readonly activeFilter = signal<CocktailCategory | 'all'>('all');

  protected readonly filters: readonly CategoryFilter[] = [
    { value: 'all', label: 'Tout', emoji: '🐘' },
    { value: 'signature', label: 'Signature', emoji: '⭐' },
    { value: 'special', label: 'Spéciaux', emoji: '✨' },
    { value: 'mystere', label: 'Mystère', emoji: '🤫' },
    { value: 'warrior', label: 'Warriors', emoji: '🎲' },
    { value: 'classique', label: 'Classiques', emoji: '🍾' },
    { value: 'doux', label: 'Doux', emoji: '🌸' },
  ];

  protected readonly filteredCocktails = computed(() => {
    const filter = this.activeFilter();
    const all = this.allCocktails();
    return filter === 'all' ? all : all.filter((c) => c.category === filter);
  });

  ngOnInit(): void {
    this.cocktailService.getCocktails().subscribe((cocktails) => {
      this.allCocktails.set(cocktails);
    });
  }

  protected setFilter(filter: CocktailCategory | 'all'): void {
    this.activeFilter.set(filter);
  }
}
