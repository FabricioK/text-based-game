import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  step : number;
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.step = 1;
    this.items = db.collection('games', ref => ref.orderBy('step').startAt(this.step).endAt(this.step)).valueChanges();
  }
  ngOnInit() {
  }
  
}
