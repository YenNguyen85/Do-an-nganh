import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HttpResponse } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';

import { IProduct } from 'app/shared/model/product.model';
import { ICategory } from 'app/shared/model/category.model';

import { ProductService } from 'app/entities/product/product.service';
import { CategoryService } from 'app/entities/category/category.service';
import { LoginModalService } from 'app/core/login/login-modal.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products?: IProduct[];
  categories?: ICategory[];
  eventSubscriber?: Subscription;
  keyword?: string;

  constructor(
    private loginModalService: LoginModalService,
    protected productService: ProductService,
    protected categoryService: CategoryService,
    protected eventManager: JhiEventManager
  ) {}

  ngOnInit(): void {
    this.loadAllCategory();
    this.loadAllProducts();
  }

  // Tải danh sách tất cả loại
  loadAllCategory(): void {
    this.categoryService.query().subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body || []));
  }

  // Tải danh sách tất cả sản phẩm
  loadAllProducts(): void {
    this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
  }

  // tải danh sách sản phẩm thuộc loại được chọn
  loadProducts(category: ICategory): void {
    if (category.id != null) {
      this.productService.findByCategoriesId(category.id).subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
    } else {
      alert('category is null');
    }
  }

  /**
   * tải danh sách sản phẩm có tên chứa từ khóa
   * Nếu từ khóa chứa ít hơn 2 kí tự thì không cần tìm
   */
  loadProductsByKeyword(): void {
    if (this.keyword != null && this.keyword.length >= 2) {
      this.productService.findByNameContaining(this.keyword).subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
    } else {
      alert('Vui lòng nhập ít nhất 2 kí tự để tìm kiếm');
    }
  }

  trackId(index: number, item: IProduct): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  // isAuthenticated(): boolean {
  //   return this.accountService.isAuthenticated();
  // }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }
}
