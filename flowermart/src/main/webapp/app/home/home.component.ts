import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HttpResponse } from '@angular/common/http';

import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products?: IProduct[];
  eventSubscriber?: Subscription;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    protected productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
  }

  trackId(index: number, item: IProduct): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {}
}
