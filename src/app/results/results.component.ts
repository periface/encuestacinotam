import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Component({
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {
  data: AngularFireList<{}>;
  results: any[] = [];
  frecuencies: any[] = [];
  frecuenciesEsp: any[] = [];
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
        data.forEach((elm: any) => {
          // tslint:disable-next-line:forin
          console.log(elm.Areas);
          this.buildFrecuencies(elm);
          this.buildFrecuenciesEsp(elm);
          this.results.push(elm);
        });

        console.log('frecuencias', this.frecuencies);
        console.log('frecuencias esp', this.frecuenciesEsp);
      });
  }
  private buildFrecuencies(elm) {
    let frecuencyObject;
    if (!elm.Areas) {
      return;
    }
    for (let index = 0; index < elm.Areas.length; index++) {
      const area = elm.Areas[index];

      const frecuenciesForArea = this.frecuencies.find(
        a => a.area === area.group
      );

      if (frecuenciesForArea) {
        for (let indexGrp = 0; indexGrp < area.elements.length; indexGrp++) {
          const element = area.elements[indexGrp];
          const found = frecuenciesForArea.frecuencies.find(
            a => a.name === element.name
          );
          if (found && found.name === 'Otro' && found.value === '') {
            continue;
          }
          if (found) {
            found.count = found.count + 1;
          } else {
            frecuenciesForArea.frecuencies.push({
              name: element.name,
              count: 1,
              otherValue: element.name === 'Otro' ? element.value : ''
            });
          }
        }
      } else {
        frecuencyObject = {
          area: area.group,
          frecuencies: []
        };
        for (let indexGrp = 0; indexGrp < area.elements.length; indexGrp++) {
          const element = area.elements[indexGrp];
          const found = frecuencyObject.frecuencies.find(
            a => a.name === element.name
          );
          if (found && found.name === 'Otro' && found.value === '') {
            continue;
          }
          if (found) {
            found.count = found.count + 1;
          } else {
            frecuencyObject.frecuencies.push({
              name: element.name,
              count: 1
            });
          }
        }

        this.frecuencies.push(frecuencyObject);
      }
    }
  }
  private buildFrecuenciesEsp(elm) {
    let frecuencyObject;
    if (!elm.Especialidad) {
      return;
    }
    for (let index = 0; index < elm.Especialidad.length; index++) {
      const area = elm.Especialidad[index];

      const frecuenciesForArea = this.frecuenciesEsp.find(
        a => a.area === area.group
      );

      if (frecuenciesForArea) {
        console.log(area);
        if (area.elements) {
          for (let indexGrp = 0; indexGrp < area.elements.length; indexGrp++) {
            const element = area.elements[indexGrp];
            const found = frecuenciesForArea.frecuencies.find(
              a => a.name === element.name
            );
            if (found && found.name === 'Otro' && found.value === '') {
              continue;
            }
            if (found) {
              found.count = found.count + 1;
            } else {
              frecuenciesForArea.frecuencies.push({
                name: element.name,
                count: 1,
                otherValue: element.name === 'Otro' ? element.value : ''
              });
            }
          }
        }
      } else {
        frecuencyObject = {
          area: area.group,
          frecuencies: []
        };
        for (let indexGrp = 0; indexGrp < area.elements.length; indexGrp++) {
          const element = area.elements[indexGrp];
          const found = frecuencyObject.frecuencies.find(
            a => a.name === element.name
          );
          if (found && found.name === 'Otro' && found.value === '') {
            continue;
          }
          if (found) {
            found.count = found.count + 1;
          } else {
            frecuencyObject.frecuencies.push({
              name: element.name,
              count: 1
            });
          }
        }

        this.frecuenciesEsp.push(frecuencyObject);
      }
    }
  }
}
