import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IBill, Bill } from 'app/shared/model/bill.model';
import { BillService } from './bill.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';

@Component({
  selector: 'jhi-bill-update',
  templateUrl: './bill-update.component.html',
})
export class BillUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomer[] = [];

  editForm = this.fb.group({
    id: [],
    placedDate: [null, [Validators.required]],
    status: [null, [Validators.required]],
    customer: [],
  });

  constructor(
    protected billService: BillService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bill }) => {
      if (!bill.id) {
        const today = moment().startOf('day');
        bill.placedDate = today;
      }

      this.updateForm(bill);

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));
    });
  }

  updateForm(bill: IBill): void {
    this.editForm.patchValue({
      id: bill.id,
      placedDate: bill.placedDate ? bill.placedDate.format(DATE_TIME_FORMAT) : null,
      status: bill.status,
      customer: bill.customer,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bill = this.createFromForm();
    if (bill.id !== undefined) {
      this.subscribeToSaveResponse(this.billService.update(bill));
    } else {
      this.subscribeToSaveResponse(this.billService.create(bill));
    }
  }

  private createFromForm(): IBill {
    return {
      ...new Bill(),
      id: this.editForm.get(['id'])!.value,
      placedDate: this.editForm.get(['placedDate'])!.value ? moment(this.editForm.get(['placedDate'])!.value, DATE_TIME_FORMAT) : undefined,
      status: this.editForm.get(['status'])!.value,
      customer: this.editForm.get(['customer'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBill>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICustomer): any {
    return item.id;
  }
}
