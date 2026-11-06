import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { localizedPath } from './locale-path';

/** Internal link target for the active language (Arabic service pages use `/ar/...`). */
@Pipe({ name: 'localePath', standalone: true, pure: false })
export class LocalePathPipe implements PipeTransform {
  private readonly translate = inject(TranslateService);

  transform(path: string): string {
    return localizedPath(path, this.translate.getCurrentLang());
  }
}
