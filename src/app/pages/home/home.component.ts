import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  reservationForm: FormGroup;
  formSubmitLoading = false;

  tables = [1, 2, 3, 4, 5, 6, 7, 8]

  constructor(
    private toast: HotToastService,
    private reservationService: ReservationService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  initializeForm() {
    this.reservationForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      contactnumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      person: new FormControl('', Validators.required),
      table: new FormControl('', Validators.required),
      schedule: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.reservationForm.status == 'INVALID') {
      this.toast.warning('Please fill out the fields.', {
        position: 'top-center',
      });
      return;
    }

    const res = this.reservationService.storeReservation(
      this.reservationForm.value
    );

    if (res == 'OK') {
      this.toast.success('Reservation Submitted. Please Wait for a Call Confirmation', {
        position: 'top-center',
      });

      this.reservationForm.reset();
    } else {
      this.toast.error('Something went wrong.', { position: 'top-center' });
    }
  }
}
