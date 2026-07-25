import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-trust-bar',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './trust-bar.component.html',
})
export class TrustBarComponent {
  readonly items = [
    {
      titleKey: 'home.trust.approved',
      icon: 'shield',
    },
    {
      titleKey: 'home.trust.scientific',
      icon: 'science',
    },
    {
      titleKey: 'home.trust.fast',
      icon: 'bolt',
    },
  ] as const;
}
