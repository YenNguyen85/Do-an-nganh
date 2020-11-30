import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBillItem, BillItem } from 'app/shared/model/bill-item.model';
import { BillItemService } from './bill-item.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';
import { IBill } from 'app/shared/model/bill.model';
import { BillService } from 'app/entities/bill/bill.service';

type SelectableEntity = IProduct | IBill;

@Component({
  selector: 'jhi-bill-item-update',
  templateUrl: './bill-item-update.component.html',
})
export class BillItemUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];
  bills: IBill[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [null, [Validators.required, Validators.min(0)]],
    product: [],
    bill: [],
  });

  constructor(
    protected billItemService: BillItemService,
    protected productService: ProductService,
    protected billService: BillService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ billItem }) => {
      this.updateForm(billItem);

      this.productService
        .query({ filter: 'billitem-is-null' })
        .pipe(
          map((res: HttpResponse<IProduct[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProduct[]) => {
          if (!billItem.product || !billItem.product.id) {
            this.products = resBody;
          } else {
            this.productService
              .find(billItem.product.id)
              .pipe(
                map((subRes: HttpResponse<IProduct>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProduct[]) => (this.products = concatRes));
          }
        });

      this.billService.query().subscribe((res: HttpResponse<IBill[]>) => (this.bills = res.body || []));
    });
  }

  updateForm(billItem: IBillItem): void {
    this.editForm.patchValue({
      id: billItem.id,
      quantity: billItem.quantity,
      product: billItem.product,
      bill: billItem.bill,
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
      product: this.editForm.get(['product'])!.value,
      bill: this.editForm.get(['bill'])!.value,
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
