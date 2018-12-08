import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary'
})

export class Summary implements PipeTransform {
    transform(html: string, id: string, title: string): string {
        let maxLength = 256;
        let sub = html.replace(/<(?:.|\n)*?>/gm, '').substring(0, maxLength);
        return `${sub.substr(0, Math.min(sub.length, sub.lastIndexOf(" ")))}`;
    }
}