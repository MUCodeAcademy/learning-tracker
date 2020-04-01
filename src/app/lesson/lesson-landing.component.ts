import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-lesson-landing',
  templateUrl: './lesson-landing.component.html',
  styleUrls: ['./lesson-landing.component.scss']
})
export class LessonLandingComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
