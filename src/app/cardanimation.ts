import { Component } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';

  @Component({
    selector: 'app-animation',
    animations: [
        trigger('hideShow', [
          state('show', style({
            opacity: 1
          })),
          state('hide', style({
            opacity: 0
          })),
          transition('hide => show', [
            animate('1s')
          ])
        ])    
      ]
  })

  export class CardAnimation {
      isVisible = false;
  }