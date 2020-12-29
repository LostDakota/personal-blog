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
    urls = ["/highlight.min.js", "/hl.js"]
    quillStyles = ["//cdn.quilljs.com/1.3.6/quill.core.css", "//cdn.quilljs.com/1.3.6/quill.snow.css", "//cdn.quilljs.com/1.3.6/quill.bubble.css"]

    constructor() { }

    injectScripts() {
        const head = document.getElementsByTagName('head')[0];

        this.urls.forEach(url => {
            let script = document.createElement('script');
            script.src = url;
            head.appendChild(script);
        })
    }

    injectQuillStyles() {
        this.quillStyles.forEach(url => {
            if(document.body.querySelector(`[href="${url}"]`)) return;

            let elem = document.createElement('link');
            elem.rel = 'stylesheet';
            elem.href = url;
            document.body.prepend(elem);
        })
    }
}