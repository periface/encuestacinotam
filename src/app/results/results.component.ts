import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Component({
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {
  data: AngularFireList<{}>;
  results: any[] = [];
  /**
   *
   */
  constructor(public db: AngularFireDatabase) {
    this.data = db.list('/responses');
  }
  ngOnInit(): void {
    this.db
      .list('/responses')
      .valueChanges()
      .subscribe(data => {
        data.forEach(elm => {
          this.results.push(elm);
        });
      });
  }
}
