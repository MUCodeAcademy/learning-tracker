import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.scss']
})
export class RetentionComponent implements OnInit {

  @Input('rating') private rating: number;
  @Input('starCount') private starCount: number;
  @Input('color') color: string;
  @Output() private ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  ratingArr = [];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++){
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
    console.log(rating)
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number){
    if (this.rating >= index + 1) {
      return 'star';
    }
    else {
      return 'star_border';
    }
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
