# CLAUDE.md — Guide de développement

## Contexte du projet

Application vitrine développée avec Angular pour un bar à cocktails.

Objectifs principaux :

* Présenter le bar, la carte des cocktails et l’ambiance.
* Optimiser l’expérience mobile et desktop.
* Maximiser les performances et le référencement SEO.
* Fournir une interface moderne, fluide et maintenable.

---

# Stack technique

## Frontend

* Angular standalone components uniquement
* Angular version stable LTS
* TypeScript strict mode activé
* RxJS
* SCSS
* Angular Router
* Angular Signals recommandés pour l’état local
* Architecture frontend uniquement (sans backend)
* Données mockées ou fichiers JSON locaux si nécessaire

## UI / Styling

* Approche responsive mobile-first
* Utilisation cohérente des design tokens
* Variables SCSS centralisées
* Accessibilité WCAG AA minimum
* Animations légères et performantes

## Outils

* ESLint
* Prettier
* Husky
* lint-staged
* Angular CLI
* GitHub Actions / GitLab CI si CI/CD

---

# Architecture du projet

## Structure recommandée

```txt
src/
 ├── app/
 │    ├── core/
 │    │    ├── services/
 │    │    ├── interceptors/
 │    │    ├── guards/
 │    │    └── layout/
 │    │
 │    ├── shared/
 │    │    ├── components/
 │    │    ├── directives/
 │    │    ├── pipes/
 │    │    └── models/
 │    │
 │    ├── features/
 │    │    ├── home/
 │    │    ├── cocktails/
 │    │    ├── about/
 │    │    ├── contact/
 │    │
 │    └── app.routes.ts
 │
 ├── assets/
 ├── environments/
 └── styles/
```

---

# Standards de code

## TypeScript

### Obligations

* Toujours utiliser le mode strict.
* Éviter `any`.
* Préférer `readonly` lorsque possible.
* Préférer les types explicites pour les API publiques.
* Utiliser des interfaces pour les contrats métier.
* Favoriser l’immutabilité.

### Nommage

* Components : `cocktail-card.component.ts`
* Services : `cocktail.service.ts`
* Interfaces : `Cocktail`
* Enum : `CocktailCategory`
* Observables suffixés par `$`

Exemple :

```ts
cocktails$ = this.cocktailService.getCocktails();
```

---

## Angular

### Architecture retenue

Le projet utilise exclusivement :

* standalone components
* standalone directives
* standalone pipes
* lazy loading par route
* architecture modulaire par feature

Le projet ne doit pas utiliser de `NgModule` sauf nécessité technique exceptionnelle.

### Bonnes pratiques

* Utiliser des standalone components.
* Utiliser `OnPush` par défaut.
* Limiter la logique dans les templates.
* Préférer les composants petits et réutilisables.
* Éviter les subscriptions manuelles inutiles.
* Utiliser `async` pipe dès que possible.
* Centraliser les appels API dans des services.
* Éviter la duplication de logique.

### Change Detection

Toujours privilégier :

```ts
changeDetection: ChangeDetectionStrategy.OnPush
```

### Gestion des états

* État local avec Signals ou RxJS.
* Éviter les state managers lourds si l’application reste vitrine.
* Favoriser une architecture simple et maintenable.

---

# Responsive Design

## Règles

* Mobile-first obligatoire.
* Tester systématiquement :

  * mobile
  * tablette
  * desktop
* Utiliser Flexbox et Grid.
* Éviter les tailles fixes.
* Prévoir les écrans Retina.

## Breakpoints recommandés

```scss
$mobile: 480px;
$tablet: 768px;
$desktop: 1024px;
$wide: 1440px;
```

---

# Performance

## Objectifs

* Lighthouse > 90
* Temps de chargement minimal
* Images optimisées
* Bundle Angular maîtrisé

## Obligations

* Lazy loading des features.
* Compression des assets.
* Utilisation du format WebP/AVIF.
* Optimisation des fonts.
* Éviter les dépendances inutiles.
* Utiliser `trackBy` dans les boucles.
* Préférer `NgOptimizedImage`.

Exemple :

```html
<img
  ngSrc="assets/cocktails/mojito.webp"
  width="400"
  height="600"
  alt="Cocktail Mojito"
/>
```

---

# SEO

## Obligations

* Meta tags dynamiques.
* Titres uniques par page.
* Open Graph.
* Sitemap.
* Robots.txt.
* URLs propres.
* Données structurées Schema.org si pertinent.

## Accessibilité SEO

* Hiérarchie H1 → H6 correcte.
* Texte alternatif sur toutes les images.
* Navigation clavier.
* Contrastes suffisants.

---

# Accessibilité

## Standards

* WCAG AA minimum.
* Navigation clavier complète.
* Focus visibles.
* Labels explicites.
* Aria labels uniquement si nécessaire.

## Interdictions

* Pas de texte dans des images.
* Pas de contraste faible.
* Pas d’animations agressives.

---

# UI / UX

## Direction technique UI

Le projet utilise :

* SCSS classique structuré
* architecture SCSS modulaire
* variables globales
* mixins réutilisables
* design tokens centralisés

## Structure SCSS recommandée

```txt
styles/
 ├── abstracts/
 │    ├── _variables.scss
 │    ├── _mixins.scss
 │    └── _functions.scss
 │
 ├── base/
 ├── components/
 ├── layout/
 ├── pages/
 └── themes/
```

## Règles SCSS

* Éviter l’imbrication excessive.
* Limiter `!important`.
* Utiliser des classes explicites.
* Respecter une convention cohérente.
* Mutualiser les styles répétitifs.

---

# UI / UX

## Direction artistique

L’application doit transmettre :

* élégance
* ambiance premium
* chaleur
* modernité
* fluidité

## Animations

Les animations sont une composante importante de l’expérience utilisateur.

Objectifs :

* renforcer l’ambiance premium
* améliorer la perception de fluidité
* guider l’attention utilisateur
* conserver de très bonnes performances

### Règles

* Utiliser Angular Animations ou CSS animations.
* Prioriser les propriétés GPU-friendly :

  * transform
  * opacity
* Éviter les animations coûteuses.
* Respect obligatoire de `prefers-reduced-motion`.
* Les animations ne doivent jamais bloquer l’interaction.
* Les animations doivent rester cohérentes dans toute l’application.

### Interdictions

* animations longues inutiles
* animations au scroll excessives
* effets visuels agressifs
* transitions non fluides
* animations qui dégradent le Lighthouse

### Exemples adaptés au projet

* apparition progressive des cocktails
* hover premium sur cartes
* transitions fluides du menu mobile
* micro-interactions sur boutons
* animations discrètes sur hero section

## Expérience utilisateur

* Navigation simple.
* Temps d’accès rapide aux informations.
* CTA visibles.
* Menu mobile fluide.
* Formulaire de contact simple.

---

# Gestion des données

## Contexte

Le projet est une application vitrine sans backend.

Les données peuvent être :

* stockées localement
* mockées dans des fichiers TypeScript
* chargées depuis des fichiers JSON statiques

Exemple recommandé :

```txt
src/assets/data/cocktails.json
```

## Organisation recommandée

```txt
shared/
 ├── models/
 ├── data/
 └── services/
```

## Règles

* Toujours typer les données.
* Centraliser les accès aux données dans des services.
* Préparer l’architecture pour permettre un futur backend sans refactor massif.

---

# API et données

## Règles

* Tous les appels HTTP passent par des services.
* Gestion centralisée des erreurs.
* Typage strict des réponses.
* Ne jamais exposer de secrets côté frontend.

## Exemple

```ts
getCocktails(): Observable<Cocktail[]> {
  return this.http.get<Cocktail[]>(`${environment.apiUrl}/cocktails`);
}
```

---

# Gestion des erreurs

## Obligations

* Messages utilisateur clairs.
* Logs techniques non visibles côté utilisateur.
* Fallback UI pour les erreurs réseau.
* Gestion des loaders.

---

# Sécurité

## Obligations

* Sanitizer Angular respecté.
* Jamais de `innerHTML` non sécurisé.
* Validation des formulaires.
* Variables sensibles uniquement via environnement.
* Headers de sécurité côté backend.

---

# Git

## Convention de commits

Convention recommandée : Conventional Commits.

Exemples :

```txt
feat: add cocktail gallery
fix: improve mobile navbar
refactor: simplify reservation service
style: improve homepage spacing
```

---

# Pull Requests

## Obligations avant merge

* Lint OK
* Build OK
* Tests OK
* Responsive vérifié
* Accessibilité vérifiée
* Pas de code mort
* Pas de console.log

---

# Qualité de code

## ESLint

Aucune erreur ESLint autorisée.

## Prettier

Le formatage doit être automatique.

## Duplication

Éviter toute duplication de logique métier ou UI.

---

# Tests

## Minimum attendu

* Tests unitaires pour services critiques.
* Tests composants pour logique importante.
* Vérification responsive.

## Outils

* Jasmine
* Karma ou Vitest selon stack choisie
* Cypress ou Playwright pour E2E

---

# Variables d’environnement

## Règles

* Aucun secret dans le repository.
* Variables séparées par environnement.
* Configuration centralisée.

---

# Assets et médias

## Images

* Compression obligatoire.
* Formats modernes.
* Lazy loading.
* Dimensions explicites.

## Vidéos

* Courtes.
* Compressées.
* Jamais bloquantes.

---

# Documentation

## Obligations

* Documenter les décisions importantes.
* README maintenu.
* Architecture expliquée.
* Scripts npm documentés.

---

# Scripts npm recommandés

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "format": "prettier --write .",
    "e2e": "playwright test"
  }
}
```

---

# Règles de revue de code

## Vérifications systématiques

* Lisibilité
* Simplicité
* Performance
* Accessibilité
* Responsive
* Réutilisabilité
* Dette technique

---

# Interdictions

## À éviter absolument

* `any`
* composants gigantesques
* logique métier dans les templates
* CSS non structuré
* dépendances inutiles
* subscriptions non nettoyées
* hardcoded values répétées
* duplication de composants
* inline styles excessifs

---

# Vision produit

Le site doit :

* inspirer confiance
* valoriser l’image du bar
* être extrêmement fluide sur mobile
* charger rapidement
* donner envie de visiter l’établissement
* mettre les cocktails et l’ambiance au centre de l’expérience

---

# Workflow recommandé

## Développement

1. Créer une branche feature.
2. Développer.
3. Lancer lint + tests.
4. Vérifier responsive.
5. Vérifier accessibilité.
6. Ouvrir PR.
7. Code review.
8. Merge.

---

# Commandements du projet

* Garder le code simple.
* Prioriser la maintenabilité.
* Prioriser la performance.
* Prioriser l’expérience mobile.
* Prioriser l’accessibilité.
* Ne jamais sacrifier la lisibilité pour de l’optimisation prématurée.
* Toute feature doit apporter une vraie valeur utilisateur.
