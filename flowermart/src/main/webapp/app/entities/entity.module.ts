import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'contact-info',
        loadChildren: () => import('./contact-info/contact-info.module').then(m => m.FlowermartContactInfoModule),
      },
      {
        path: 'news-and-event',
        loadChildren: () => import('./news-and-event/news-and-event.module').then(m => m.FlowermartNewsAndEventModule),
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.FlowermartCustomerModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.FlowermartProductModule),
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.FlowermartCategoryModule),
      },
      {
        path: 'bill',
        loadChildren: () => import('./bill/bill.module').then(m => m.FlowermartBillModule),
      },
      {
        path: 'bill-item',
        loadChildren: () => import('./bill-item/bill-item.module').then(m => m.FlowermartBillItemModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class FlowermartEntityModule {}
