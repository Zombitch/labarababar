export interface Cocktail {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly warning: string;
  readonly emoji: string;
  readonly category: CocktailCategory;
  readonly ingredients: readonly string[];
  readonly badge: string;
}

export type CocktailCategory =
  | 'signature'
  | 'special'
  | 'mystere'
  | 'warrior'
  | 'classique'
  | 'doux';
