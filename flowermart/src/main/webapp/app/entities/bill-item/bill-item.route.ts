import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBillItem, BillItem } from 'app/shared/model/bill-item.model';
import { BillItemService } from './bill-item.service';
import { BillItemComponent } from './bill-item.component';
import { BillItemDetailComponent } from './bill-item-detail.component';
import { BillItemUpdateComponent } from './bill-item-update.component';

@Injectable({ providedIn: 'root' })
export class BillItemResolve implements Resolve<IBillItem> {
  constructor(private service: BillItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBillItem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((billItem: HttpResponse<BillItem>) => {
          if (billItem.body) {
            return of(billItem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BillItem());
  }
}

export const billItemRoute: Routes = [
  {
    path: '',
    component: BillItemComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.billItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BillItemDetailComponent,
    resolve: {
      billItem: BillItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.billItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BillItemUpdateComponent,
    resolve: {
      billItem: BillItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.billItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BillItemUpdateComponent,
    resolve: {
      billItem: BillItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.billItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
