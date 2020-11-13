import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInfoCustomer, InfoCustomer } from 'app/shared/model/info-customer.model';
import { InfoCustomerService } from './info-customer.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-info-customer-update',
  templateUrl: './info-customer-update.component.html',
})
export class InfoCustomerUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    gender: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    addressLine1: [null, [Validators.required]],
    addressLine2: [],
    city: [null, [Validators.required]],
    country: [null, [Validators.required]],
    user: [],
  });

  constructor(
    protected infoCustomerService: InfoCustomerService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ infoCustomer }) => {
      this.updateForm(infoCustomer);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(infoCustomer: IInfoCustomer): void {
    this.editForm.patchValue({
      id: infoCustomer.id,
      gender: infoCustomer.gender,
      phone: infoCustomer.phone,
      addressLine1: infoCustomer.addressLine1,
      addressLine2: infoCustomer.addressLine2,
      city: infoCustomer.city,
      country: infoCustomer.country,
      user: infoCustomer.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const infoCustomer = this.createFromForm();
    if (infoCustomer.id !== undefined) {
      this.subscribeToSaveResponse(this.infoCustomerService.update(infoCustomer));
    } else {
      this.subscribeToSaveResponse(this.infoCustomerService.create(infoCustomer));
    }
  }

  private createFromForm(): IInfoCustomer {
    return {
      ...new InfoCustomer(),
      id: this.editForm.get(['id'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      addressLine1: this.editForm.get(['addressLine1'])!.value,
      addressLine2: this.editForm.get(['addressLine2'])!.value,
      city: this.editForm.get(['city'])!.value,
      country: this.editForm.get(['country'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInfoCustomer>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
