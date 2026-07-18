import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ServiceSidebarComponent } from '../../shared/components/service-sidebar/service-sidebar.component';

@Component({
  selector: 'app-capturation-chats-page',
  standalone: true,
  imports: [PageHeaderComponent, ServiceSidebarComponent],
  templateUrl: './capturation-chats.page.html',
  styleUrl: './capturation-chats.page.scss',
})
export class CapturationChatsPage {
  readonly site = SITE_CONFIG;
}
