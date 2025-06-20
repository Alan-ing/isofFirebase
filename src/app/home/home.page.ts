import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { interval } from 'rxjs';
import { set, ref } from '@angular/fire/database';
import { Database } from '@angular/fire/database';
import { inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  private db = inject(Database);
  
  temperature: number | null = 0;
  humidity: number | null = 0;
  fan: number | null = 0;
  led: number | null = 0;
  waterPump: number | null = 0;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.loadData();
    interval(5000).subscribe(() => {
      this.loadData();
      this.runAutoLogic();
    });
  }

  loadData() {
    this.firebaseService.getTemperature().subscribe(temp => this.temperature = temp);
    this.firebaseService.getHumidity().subscribe(hum => this.humidity = hum);
    this.firebaseService.getFanStatus().subscribe(fan => this.fan = fan);
    this.firebaseService.getLedStatus().subscribe(led => this.led = led);
    this.firebaseService.getPumpStatus().subscribe(pump => this.waterPump = pump);
  }

  runAutoLogic() {
    // LED alerta
    this.setLed(1);
    setTimeout(() => this.setLed(0), 1000);

    // Control de abanico (motor)
    if (this.temperature != null && this.temperature > 0 && this.temperature < 30) {
      this.setFan(1);
    } else {
      this.setFan(0);
    }

    // Bomba si humedad < 30
    if (this.humidity != null && this.humidity > 0 && this.humidity < 30) {
      this.setPump(1);
      setTimeout(() => this.setPump(0), 5000);
    }
  }

  // Métodos Firebase
  setFan(status: number) {
    set(ref(this.db, 'fans/fan_1'), status);
  }

  setLed(status: number) {
    set(ref(this.db, 'devices/led'), status);
  }

  setPump(status: number) {
    set(ref(this.db, 'devices/water_pump'), status);
  }

  // Botones manuales
  toggleFan() {
    this.setFan(this.fan === 0 ? 1 : 0);
  }

  toggleLed() {
    this.setLed(this.led === 0 ? 1 : 0);
  }

  togglePump() {
    this.setPump(this.waterPump === 0 ? 1 : 0);
  }

  shutdownAll() {
    this.setFan(0);
    this.setLed(0);
    this.setPump(0);
  }

  powerOnAll() {
    this.setFan(1);
    this.setLed(1);
    this.setPump(1);
  }
  // En tu componente.ts
isDarkMode = false;

toggleTheme() {
  this.isDarkMode = !this.isDarkMode;
  document.body.classList.toggle('dark', this.isDarkMode);
}
}

