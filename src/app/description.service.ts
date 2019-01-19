import { Meta } from '@angular/platform-browser';
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})

export class DescriptionService {

    constructor(
        private meta: Meta
    ) { };

    updateDescription(rawHtml: string) {
        let description = rawHtml.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 160).trim();
        this.meta.updateTag({name: 'description', content: description});
    }
}