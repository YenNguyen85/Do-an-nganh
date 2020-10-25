import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { ProductService } from 'app/entities/product/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { IProduct } from 'app/shared/model/product.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  products?: IProduct[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    protected productService: ProductService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.loadAll();
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.productService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
      return;
    }

    this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
  }

  trackId(index: number, item: IProduct): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
