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
  readonly color: string;
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
  protected readonly animating = signal(false);

  protected readonly filters: readonly CategoryFilter[] = [
    { value: 'all',       label: 'Tout',       emoji: '🐘', color: '#ff1b8d' },
    { value: 'signature', label: 'Signature',  emoji: '⭐', color: '#ff1b8d' },
    { value: 'special',   label: 'Spéciaux',   emoji: '✨', color: '#c084f5' },
    { value: 'mystere',   label: 'Mystère',    emoji: '🤫', color: '#7b68ee' },
    { value: 'warrior',   label: 'Warriors',   emoji: '🎲', color: '#e74c3c' },
    { value: 'classique', label: 'Classiques', emoji: '🍾', color: '#ffd700' },
    { value: 'doux',      label: 'Doux',       emoji: '🌸', color: '#ff69b4' },
  ];

  protected readonly filteredCocktails = computed(() => {
    const filter = this.activeFilter();
    const all = this.allCocktails();
    return filter === 'all' ? all : all.filter((c) => c.category === filter);
  });

  protected countFor(value: CocktailCategory | 'all'): number {
    const all = this.allCocktails();
    return value === 'all' ? all.length : all.filter((c) => c.category === value).length;
  }

  protected labelFor(category: string): string {
    return this.filters.find((f) => f.value === category)?.label ?? category;
  }

  protected colorFor(category: string): string {
    return this.filters.find((f) => f.value === category)?.color ?? '#ff1b8d';
  }

  ngOnInit(): void {
    this.cocktailService.getCocktails().subscribe((cocktails) => {
      this.allCocktails.set(cocktails);
    });
  }

  protected setFilter(filter: CocktailCategory | 'all'): void {
    if (filter === this.activeFilter()) return;
    this.animating.set(true);
    setTimeout(() => {
      this.activeFilter.set(filter);
      this.animating.set(false);
    }, 180);
  }
}
