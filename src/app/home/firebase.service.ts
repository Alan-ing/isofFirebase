import { inject, Injectable } from '@angular/core';
import { Database, onValue, ref, set } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db = inject(Database)

  constructor() { }

  setSystemStatus(status: number) {
    const statusRef = ref(this.db, 'control/shutdown');
    return set(statusRef, status)
  }


  getSystemStatus(): Observable<number | null> {
    return new Observable((observable) => {
      const statusRef = ref(this.db, 'control/shutdown');
      onValue(statusRef, (snapshot) => {
        observable.next(snapshot.val());

      })
    })
  }
  getTemperature(): Observable<number | null> {
    return new Observable((observable) => {
      const statusRef = ref(this.db, 'sensors/temperature');
      onValue(statusRef, (snapshot) => {
        observable.next(snapshot.val());

      })
    })
  }

getHumidity(): Observable<number | null> {
    return new Observable((observable) => {
      const statusRef = ref(this.db, 'sensors/humidity');
      onValue(statusRef, (snapshot) => {
        observable.next(snapshot.val());

      })
    })
  }
  getFanStatus(): Observable<number | null> {
    return new Observable((observable) => {
      const statusRef = ref(this.db, 'fans/fan_1');
      onValue(statusRef, (snapshot) => {
        observable.next(snapshot.val());

      })
    })
  }
  setFanStatus(status: number) {
  return set(ref(this.db, 'fans/fan_1'), status);
}

setWaterPump(status: number) {
  return set(ref(this.db, 'devices/water_pump'), status);
}

setLedStatus(status: number) {
  return set(ref(this.db, 'devices/led'), status);
}

getLedStatus(): Observable<number | null> {
  return new Observable(observer => {
    const ledRef = ref(this.db, 'devices/led');
    onValue(ledRef, snapshot => observer.next(snapshot.val()));
  });
}

getPumpStatus(): Observable<number | null> {
  return new Observable(observer => {
    const pumpRef = ref(this.db, 'devices/water_pump');
    onValue(pumpRef, snapshot => observer.next(snapshot.val()));
  });
}

}


