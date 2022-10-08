import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sorteio';

  constructor(private router: Router,
    private gtmService: GoogleTagManagerService) {

  }

  ngOnInit(): void {
    this.router.events.forEach(item => {
        if (item instanceof NavigationEnd) {
            const gtmTag = {
                event: 'page',
                pageName: item.url
            };

            this.gtmService.pushTag(gtmTag);
        }
    });
    this.gtmService.addGtmToDom();
  }


}
