import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'learning-checklist';

  constructor(
    private auth: AuthService,
    private router: Router,
    ) { }




  ngAfterViewInit(){
    setTimeout(() => this.router.navigate([`${window.location.pathname}`]),1000)
  }


}
