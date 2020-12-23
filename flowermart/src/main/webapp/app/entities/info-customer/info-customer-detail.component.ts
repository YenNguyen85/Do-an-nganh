import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInfoCustomer } from 'app/shared/model/info-customer.model';

@Component({
  selector: 'jhi-info-customer-detail',
  templateUrl: './info-customer-detail.component.html',
})
export class InfoCustomerDetailComponent implements OnInit {
  infoCustomer: IInfoCustomer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ infoCustomer }) => (this.infoCustomer = infoCustomer));
  }

  previousState(): void {
    window.history.back();
  }
}
