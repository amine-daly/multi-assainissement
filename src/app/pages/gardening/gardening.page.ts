import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { QuickContactComponent } from '../../shared/components/quick-contact/quick-contact.component';
import { ServiceSidebarComponent } from '../../shared/components/service-sidebar/service-sidebar.component';

@Component({
  selector: 'app-gardening-page',
  standalone: true,
  imports: [
    PageHeaderComponent,
    ServiceSidebarComponent,
    QuickContactComponent,
    TranslatePipe,
  ],
  templateUrl: './gardening.page.html',
})
export class GardeningPage {}
