import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary'
})

export class Summary implements PipeTransform {
    transform(html: string): string {
        return html.replace(/<(?:.|\n)*?>/gm, '').slice(0, 253) + '...';
    }
}