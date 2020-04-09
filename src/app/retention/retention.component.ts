import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.scss']
})
export class RetentionComponent implements OnInit {
  
  @Input('id') id: number;
  @Input('rating') rating: number;
  @Input('color') color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  ratingArr = [1,2,3,4,5];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {}
  rate(rating:number) {
    this.snackBar.open('You rated ' + rating + ' / 5' , '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit({id: this.id, rating:rating});
    console.log(rating);
    return false;
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
