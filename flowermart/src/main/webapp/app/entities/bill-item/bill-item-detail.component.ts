import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBillItem } from 'app/shared/model/bill-item.model';

@Component({
  selector: 'jhi-bill-item-detail',
  templateUrl: './bill-item-detail.component.html',
})
export class BillItemDetailComponent implements OnInit {
  billItem: IBillItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ billItem }) => (this.billItem = billItem));
  }

  previousState(): void {
    window.history.back();
  }
}
