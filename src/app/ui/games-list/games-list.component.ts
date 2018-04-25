import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../../models/User';
import { UserStage } from '../../models/UserStage';
import { Game } from '../../models/Game';
import { Room } from '../../models/Room';


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})

export class GamesListComponent implements OnInit {
  public user: User;
  public userstage: Observable<any[]>;
  private gamesCollection: AngularFirestoreCollection<Game>;
  game: Observable<any>;
  public stepList: Room[];

  constructor(public auth: AuthService, public db: AngularFirestore) {
    this.stepList = [];
    auth.user.subscribe((user) => {
      this.user = user;
    });

    this.game = db.collection('games').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Game;
        const id = a.payload.doc.id;
        return { id, ...data };
      })[0];
    });
  }
  public push(gameId) {
    var doc = this.db.collection('games/' + gameId + '/room').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Room;
        const id = a.payload.doc.id;
        this.stepList.push(data);
        return { id, ...data };
      })
    });

    doc.subscribe(val => {


    });
  }
  ngOnInit() {

  }

}
