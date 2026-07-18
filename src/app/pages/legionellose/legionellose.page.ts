import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ServiceSidebarComponent } from '../../shared/components/service-sidebar/service-sidebar.component';

@Component({
  selector: 'app-legionellose-page',
  standalone: true,
  imports: [PageHeaderComponent, ServiceSidebarComponent],
  templateUrl: './legionellose.page.html',
  styleUrl: './legionellose.page.scss',
})
export class LegionellosePage {}
