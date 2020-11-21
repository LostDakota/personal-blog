import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})

export class TitleService {

    constructor(
        private title: Title
    ) { };

    setTitle(newTitle: string) {
        this.title.setTitle(newTitle);
    }
}