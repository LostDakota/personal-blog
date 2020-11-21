import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeHtml'
})

export class Safe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(html: string){
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}