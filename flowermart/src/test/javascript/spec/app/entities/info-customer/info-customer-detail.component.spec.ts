import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FlowermartTestModule } from '../../../test.module';
import { InfoCustomerDetailComponent } from 'app/entities/info-customer/info-customer-detail.component';
import { InfoCustomer } from 'app/shared/model/info-customer.model';

describe('Component Tests', () => {
  describe('InfoCustomer Management Detail Component', () => {
    let comp: InfoCustomerDetailComponent;
    let fixture: ComponentFixture<InfoCustomerDetailComponent>;
    const route = ({ data: of({ infoCustomer: new InfoCustomer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlowermartTestModule],
        declarations: [InfoCustomerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(InfoCustomerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InfoCustomerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load infoCustomer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.infoCustomer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
