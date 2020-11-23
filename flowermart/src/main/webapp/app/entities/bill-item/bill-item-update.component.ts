import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBillItem, BillItem } from 'app/shared/model/bill-item.model';
import { BillItemService } from './bill-item.service';
import { IBill } from 'app/shared/model/bill.model';
import { BillService } from 'app/entities/bill/bill.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

type SelectableEntity = IBill | IProduct;

@Component({
  selector: 'jhi-bill-item-update',
  templateUrl: './bill-item-update.component.html',
})
export class BillItemUpdateComponent implements OnInit {
  isSaving = false;
  bills: IBill[] = [];
  products: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [null, [Validators.required, Validators.min(0)]],
    bill: [],
    product: [],
  });

  constructor(
    protected billItemService: BillItemService,
    protected billService: BillService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ billItem }) => {
      this.updateForm(billItem);

      this.billService.query().subscribe((res: HttpResponse<IBill[]>) => (this.bills = res.body || []));

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
    });
  }

  updateForm(billItem: IBillItem): void {
    this.editForm.patchValue({
      id: billItem.id,
      quantity: billItem.quantity,
      bill: billItem.bill,
      product: billItem.product,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const billItem = this.createFromForm();
    if (billItem.id !== undefined) {
      this.subscribeToSaveResponse(this.billItemService.update(billItem));
    } else {
      this.subscribeToSaveResponse(this.billItemService.create(billItem));
    }
  }

  private createFromForm(): IBillItem {
    return {
      ...new BillItem(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      bill: this.editForm.get(['bill'])!.value,
      product: this.editForm.get(['product'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBillItem>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
