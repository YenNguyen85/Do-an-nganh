import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FlowermartTestModule } from '../../../test.module';
import { InfoCustomerComponent } from 'app/entities/info-customer/info-customer.component';
import { InfoCustomerService } from 'app/entities/info-customer/info-customer.service';
import { InfoCustomer } from 'app/shared/model/info-customer.model';

describe('Component Tests', () => {
  describe('InfoCustomer Management Component', () => {
    let comp: InfoCustomerComponent;
    let fixture: ComponentFixture<InfoCustomerComponent>;
    let service: InfoCustomerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlowermartTestModule],
        declarations: [InfoCustomerComponent],
      })
        .overrideTemplate(InfoCustomerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InfoCustomerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InfoCustomerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InfoCustomer(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.infoCustomers && comp.infoCustomers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
