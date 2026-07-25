import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { LanguageService } from '../../../core/i18n/language.service';
import { BrandLogoComponent } from '../../components/brand-logo/brand-logo.component';
import { LanguageSwitcherComponent } from '../../components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    BrandLogoComponent,
    LanguageSwitcherComponent,
    TranslatePipe,
  ],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
})
export class SiteHeaderComponent {
  private readonly router = inject(Router);
  readonly lang = inject(LanguageService);

  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;

  readonly site = SITE_CONFIG;
  menuOpen = false;

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.menuOpen = false;
      });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
      this.menuToggle?.nativeElement.focus();
    }
  }
}
