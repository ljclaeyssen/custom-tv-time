import { FormControl, FormGroup } from '@angular/forms';
import { ExploreSearchFormFields } from './explore-search-form.fields';

export class ExploreSearchForm extends FormGroup {
  constructor() {
    super({
      [ExploreSearchFormFields.QUERY]: new FormControl<string>('', { nonNullable: true }),
    });
  }

  get query() {
    return this.get(ExploreSearchFormFields.QUERY) as FormControl<string>;
  }
}
