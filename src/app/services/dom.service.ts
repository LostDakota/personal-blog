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
        this.meta.updateTag({
            name: 'description',
            content: rawHtml.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 160).trim()
        });
    }
}

@Injectable()
export class ScriptService {
    urls = ["/hl.js", "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"]

    constructor() { }

    injectScripts(){
        const head = document.getElementsByTagName('head')[0];

        this.urls.forEach(url => {
            let script = document.createElement('script');
            script.src = url;
            head.appendChild(script);
        })
    }
}