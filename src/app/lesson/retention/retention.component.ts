import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Retention } from 'src/app/interfaces/retention.interface';
import { RetentionService } from 'src/app/services/retention.service';

@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.scss']
})
export class RetentionComponent implements OnInit {
  
  @Input('retention') rating: Retention;
  @Input('color') color: string = 'accent';

  private snackBarDuration: number = 2000;
  ratingArr = [1,2,3,4,5];

  constructor(private snackBar: MatSnackBar, private retention: RetentionService) { }

  ngOnInit(): void {}
  rate(rating:number) {
    this.snackBar.open('You rated ' + rating + ' / 5' , '', {
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
