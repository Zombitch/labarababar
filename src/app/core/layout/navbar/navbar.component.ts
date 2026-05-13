import {
  Component,
  ChangeDetectionStrategy,
  signal,
  HostListener,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly isMenuOpen = signal(false);
  protected readonly isScrolled = signal(false);

  protected readonly navLinks = [
    { path: '/', label: 'Accueil', exact: true },
    { path: '/cocktails', label: 'La Carte', exact: false },
    { path: '/ambiance', label: 'L\'Ambiance', exact: false },
    { path: '/contact', label: 'Nous Trouver', exact: false },
  ] as const;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
