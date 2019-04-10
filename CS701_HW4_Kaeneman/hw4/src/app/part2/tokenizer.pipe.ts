import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tokenizer'
})
export class TokenizerPipe implements PipeTransform {

  transform(value: any, delimiter?: any): any {
		if (typeof value === 'string') {
			if (delimiter) {
				var splitChars = value.split('');
				return splitChars.join(delimiter);
			}
			else {
				var splitChars = value.split('');
				return splitChars.join(',');
			}
		} else {
			return value;
		}
  }

}
