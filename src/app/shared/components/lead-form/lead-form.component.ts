import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../environments/environment';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lead-form.component.html',
})
export class LeadFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  readonly localTypes = ['Appartement', 'Villa', 'Professionnel'] as const;
  readonly isPlaceholderEndpoint =
    environment.formspreeEndpoint.includes('xxxxxxxx');

  submitState: SubmitState = 'idle';
  errorMessage = '';

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    localType: this.fb.nonNullable.control<'Appartement' | 'Villa' | 'Professionnel'>(
      'Appartement',
      Validators.required,
    ),
    message: ['', [Validators.required, Validators.minLength(10)]],
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
      email: value.email,
      localType: value.localType,
      message: value.message,
      _subject: `Demande de diagnostic — ${value.localType}`,
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
          this.errorMessage =
            "L'envoi a échoué. Appelez-nous ou réessayez dans un instant.";
        },
      });
  }

  private finishSuccess(): void {
    const done = (): void => {
      this.submitState = 'success';
      this.form.reset({ localType: 'Appartement' });
    };

    if (isPlatformBrowser(this.platformId)) {
      window.setTimeout(done, 400);
    } else {
      done();
    }
  }
}
