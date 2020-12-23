import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInfoCustomer, InfoCustomer } from 'app/shared/model/info-customer.model';
import { InfoCustomerService } from './info-customer.service';
import { InfoCustomerComponent } from './info-customer.component';
import { InfoCustomerDetailComponent } from './info-customer-detail.component';
import { InfoCustomerUpdateComponent } from './info-customer-update.component';

@Injectable({ providedIn: 'root' })
export class InfoCustomerResolve implements Resolve<IInfoCustomer> {
  constructor(private service: InfoCustomerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInfoCustomer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((infoCustomer: HttpResponse<InfoCustomer>) => {
          if (infoCustomer.body) {
            return of(infoCustomer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InfoCustomer());
  }
}

export const infoCustomerRoute: Routes = [
  {
    path: '',
    component: InfoCustomerComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.infoCustomer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InfoCustomerDetailComponent,
    resolve: {
      infoCustomer: InfoCustomerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.infoCustomer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InfoCustomerUpdateComponent,
    resolve: {
      infoCustomer: InfoCustomerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.infoCustomer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InfoCustomerUpdateComponent,
    resolve: {
      infoCustomer: InfoCustomerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.infoCustomer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
