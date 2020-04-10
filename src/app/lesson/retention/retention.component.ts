import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Retention } from '../../interfaces/retention.interface';
import { RetentionService } from '../../services/retention.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../store';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors';
import * as qclone from 'qclone'
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.scss']
})

export class RetentionComponent implements OnInit {
  @Input('retention') rating: Retention
  newrating: Retention
  @Input('color') color: string = 'accent';
  user$: Observable<User>
  user: User

  private snackBarDuration: number = 2000;
  ratingArr = [1, 2, 3, 4, 5];

  constructor(private snackBar: MatSnackBar, private retention: RetentionService, private store: Store<RootState>) {
    this.user$ = this.store.select(Selectors.getUserInfo)

  }

  ngOnInit(): void { this.user$.subscribe(res => this.user = res);this.newrating = qclone.qclone(this.rating) }

  studentrate(rating: number) {
    if (this.user.role_id === "3") {
      this.newrating.student_retention_rating = rating
      this.rate(rating)
    }
  }

  instructorrate(rating: number) {
    console.log("instructor rate fire")
    if (this.user.role_id === "2" || this.user.role_id === "1") {
      this.newrating.instructor_id = this.user.id
      this.newrating.teacher_retention_rating = rating
      console.log(this.newrating, "edited rating")
      this.rate(rating)
    }
  }

  rate(rating: number) {
    this.snackBar.open('You rated ' + rating + ' / 5', '', {
      duration: this.snackBarDuration
    });
    console.log(this.newrating)
    if (this.rating.id != "") {
      this.retention.updateRetention(this.newrating)
    }
    else this.retention.addRetention(this.newrating)
    console.log(rating);
    return false;
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
