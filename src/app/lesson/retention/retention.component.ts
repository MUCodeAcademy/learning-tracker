import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Retention } from '../../interfaces/retention.interface';
import { RetentionService } from '../../services/retention.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../store';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors';
import { User } from '../../interfaces/User.interface';

@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.scss']
})

export class RetentionComponent implements OnInit {
  @Input('retention') rating: Retention;
  @Input('color') color: string = 'accent';
  user$: Observable<User>
  user: User

  private snackBarDuration: number = 2000;
  ratingArr = [1, 2, 3, 4, 5];

  constructor(private snackBar: MatSnackBar, private retention: RetentionService, private store: Store<RootState>) {
    this.user$ = this.store.select(Selectors.getUserInfo)
  }

  ngOnInit(): void { this.user$.subscribe(res => this.user = res) }

  studentrate(rating: number) {
    if (this.user.role_id === "3") {
      this.rate(rating)
    }
  }

  instructorrate(rating: number) {
    if (this.user.role_id === "2" || this.user.role_id === "1") {
      this.rating.instructor_id = this.user.id
      this.rate(rating)
    }
  }

  rate(rating: number) {
    this.snackBar.open('You rated ' + rating + ' / 5', '', {
      duration: this.snackBarDuration
    });
    if (this.rating.id != "") {
      this.retention.updateRetention(this.rating)
    }
    else this.retention.addRetention(this.rating)
    console.log(rating);
    return false;
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
