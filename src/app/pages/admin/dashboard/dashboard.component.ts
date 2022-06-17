import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reservations: any = []

  constructor(private reservationService: ReservationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations()
  }

  changeStatus(op: any, id: any) {
    if(op == 1) {
      this.reservations.find((res: any) => res.id === id).status = "accepted";

      this.reservationService.changeReservationStatus(this.reservations)
      return
    }

    this.reservations.find((res: any) => res.id === id).status = "rejected";
    this.reservationService.changeReservationStatus(this.reservations)
  }

  logout() {
    this.authService.logout()
  }

  date(param: any) {
    return moment(param).format('MMMM Do YYYY, h:mm:ss a')
  }

}
