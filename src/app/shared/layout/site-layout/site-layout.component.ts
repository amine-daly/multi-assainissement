import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../../core/services/seo.service';
import { MobileStickyBarComponent } from '../mobile-sticky-bar/mobile-sticky-bar.component';
import { SiteFooterComponent } from '../site-footer/site-footer.component';
import { SiteHeaderComponent } from '../site-header/site-header.component';

@Component({
  selector: 'app-site-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SiteHeaderComponent,
    SiteFooterComponent,
    MobileStickyBarComponent,
    TranslatePipe,
  ],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.scss',
})
export class SiteLayoutComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.init();
  }
}
