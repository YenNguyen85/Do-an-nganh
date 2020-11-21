import { Route } from '@angular/router';
import { CartComponent } from './cart.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';

export const cartRoute: Route = {
  path: 'cart',
  component: CartComponent,
  data: {
    authorities: [Authority.USER],
  },
  canActivate: [UserRouteAccessService],
};
