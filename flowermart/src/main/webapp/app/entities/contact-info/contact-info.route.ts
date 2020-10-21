import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContactInfo, ContactInfo } from 'app/shared/model/contact-info.model';
import { ContactInfoService } from './contact-info.service';
import { ContactInfoComponent } from './contact-info.component';
import { ContactInfoDetailComponent } from './contact-info-detail.component';
import { ContactInfoUpdateComponent } from './contact-info-update.component';

@Injectable({ providedIn: 'root' })
export class ContactInfoResolve implements Resolve<IContactInfo> {
  constructor(private service: ContactInfoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContactInfo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contactInfo: HttpResponse<ContactInfo>) => {
          if (contactInfo.body) {
            return of(contactInfo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ContactInfo());
  }
}

export const contactInfoRoute: Routes = [
  {
    path: '',
    component: ContactInfoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.contactInfo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContactInfoDetailComponent,
    resolve: {
      contactInfo: ContactInfoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.contactInfo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContactInfoUpdateComponent,
    resolve: {
      contactInfo: ContactInfoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.contactInfo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContactInfoUpdateComponent,
    resolve: {
      contactInfo: ContactInfoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.contactInfo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
