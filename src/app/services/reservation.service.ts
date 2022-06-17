import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  reservations: any = [];

  constructor() {}

  storeReservation(args: any) {
    let res: any = null;
    const data = {
      id: Math.random().toString(36).slice(2, 7),
      ...args,
      status: 'pending',
    };

    try {
      if (localStorage.getItem('reservations') === null) {
        this.reservations.push(data);
        this.storeToStorage(this.reservations);
      } else {
        const resultArr = this.getReservations();

        resultArr.push(data);
        this.storeToStorage(resultArr);
      }

      res = 'OK';
    } catch (err) {
      res = err;
    }

    return res;
  }

  storeToStorage(data: any) {
    localStorage.setItem('reservations', JSON.stringify(data));
  }

  getReservations() {
    const res: any = localStorage.getItem('reservations');
    const reservations = JSON.parse(res);

    return reservations;
  }

  changeReservationStatus(data: any) {
    const resultArr = this.getReservations();
    localStorage.removeItem('reservations');

    this.storeToStorage(data)
  }
}
