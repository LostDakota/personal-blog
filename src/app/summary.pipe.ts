import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary'
})

export class Summary implements PipeTransform {
    transform(html: string): string {
        let sub = html.replace(/<(?:.|\n)*?>/gm, '').substring(0, 256);
        return `${sub.substr(0, Math.min(sub.length, sub.lastIndexOf(" ")))}`;
    }
}