import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AppLang } from '../../../core/i18n/language.constants';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  readonly language = inject(LanguageService);

  readonly open = signal(false);

  readonly active = computed(() => {
    const code = this.language.currentLang() ?? 'fr-fr';
    return (
      this.language.langs.find((l) => l.code === code) ?? this.language.langs[0]
    );
  });

  toggle(): void {
    this.open.update((v) => !v);
  }

  select(code: AppLang): void {
    this.open.set(false);
    void this.language.setLang(code);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId) || !this.open()) {
      return;
    }
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open.set(false);
  }
}
