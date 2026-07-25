import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { SITE_CONFIG } from '../../../core/config/site.config';
import { LanguageService } from '../../../core/i18n/language.service';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './lead-form.component.html',
})
export class LeadFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  readonly lang = inject(LanguageService);

  readonly site = SITE_CONFIG;
  readonly isPlaceholderEndpoint =
    environment.formspreeEndpoint.includes('xxxxxxxx');

  submitState: SubmitState = 'idle';
  errorMessage = '';

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    message: [''],
  });

  onSubmit(event?: Event): void {
    event?.preventDefault();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitState = 'loading';
    this.errorMessage = '';

    const value = this.form.getRawValue();
    const payload = {
      name: value.name,
      phone: value.phone,
      message: value.message || this.translate.instant('lead.emptyMessage'),
      _subject: this.translate.instant('lead.emailSubject', { name: value.name }),
    };

    if (this.isPlaceholderEndpoint) {
      this.finishSuccess();
      return;
    }

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.http
      .post(environment.formspreeEndpoint, payload, {
        headers: new HttpHeaders({ Accept: 'application/json' }),
      })
      .subscribe({
        next: () => this.finishSuccess(),
        error: () => {
          this.submitState = 'error';
          this.errorMessage = this.translate.instant('lead.error', {
            phone: this.site.mobileDisplay,
          });
        },
      });
  }

  private finishSuccess(): void {
    const done = (): void => {
      this.submitState = 'success';
      this.form.reset();
    };

    if (isPlatformBrowser(this.platformId)) {
      window.setTimeout(done, 400);
    } else {
      done();
    }
  }
}
