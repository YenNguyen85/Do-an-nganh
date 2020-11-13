import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INewsAndEvent, NewsAndEvent } from 'app/shared/model/news-and-event.model';
import { NewsAndEventService } from './news-and-event.service';
import { NewsAndEventComponent } from './news-and-event.component';
import { NewsAndEventDetailComponent } from './news-and-event-detail.component';
import { NewsAndEventUpdateComponent } from './news-and-event-update.component';

@Injectable({ providedIn: 'root' })
export class NewsAndEventResolve implements Resolve<INewsAndEvent> {
  constructor(private service: NewsAndEventService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INewsAndEvent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((newsAndEvent: HttpResponse<NewsAndEvent>) => {
          if (newsAndEvent.body) {
            return of(newsAndEvent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NewsAndEvent());
  }
}

export const newsAndEventRoute: Routes = [
  {
    path: '',
    component: NewsAndEventComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.newsAndEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NewsAndEventDetailComponent,
    resolve: {
      newsAndEvent: NewsAndEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.newsAndEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NewsAndEventUpdateComponent,
    resolve: {
      newsAndEvent: NewsAndEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.newsAndEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NewsAndEventUpdateComponent,
    resolve: {
      newsAndEvent: NewsAndEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flowermartApp.newsAndEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
