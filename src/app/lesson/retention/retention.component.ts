import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Retention } from 'src/app/interfaces/retention.interface';
import { RetentionService } from 'src/app/services/retention.service';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { Observable } from 'rxjs';
import * as Selectors from '../../store/selectors'

@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.scss']
})
export class RetentionComponent implements OnInit {

  @Input('retention') rating: Retention;
  @Input('color') color: string = 'accent';
  userrole$: Observable<string>
  userrole: string

  private snackBarDuration: number = 2000;
  ratingArr = [1, 2, 3, 4, 5];

  constructor(private snackBar: MatSnackBar, private retention: RetentionService, private store: Store<RootState>) {
    this.userrole$ = this.store.select(Selectors.getUserRole)
  }

  ngOnInit(): void { this.userrole$.subscribe(res => this.userrole = res) }

  studentrate(rating: number) {
    if (this.userrole === "3") {
      this.rate(rating)
    }
  }

  instructorrate(rating: number) {
    if (this.userrole === "2" || this.userrole === "1") {
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
