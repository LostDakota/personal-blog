import { ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  host: {'id': 'footer', 'class': 'd-none'},
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent {
year: Number;

  constructor(private cd: ChangeDetectorRef) { };

  ngOnInit() {
    this.year = new Date().getFullYear();
    setTimeout(() => {
      document.getElementById('footer').classList.toggle('d-none')
      this.cd.detectChanges();
    }, 600);
  }
}