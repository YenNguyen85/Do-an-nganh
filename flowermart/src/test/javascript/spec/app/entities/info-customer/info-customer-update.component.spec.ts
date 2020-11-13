import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FlowermartTestModule } from '../../../test.module';
import { InfoCustomerUpdateComponent } from 'app/entities/info-customer/info-customer-update.component';
import { InfoCustomerService } from 'app/entities/info-customer/info-customer.service';
import { InfoCustomer } from 'app/shared/model/info-customer.model';

describe('Component Tests', () => {
  describe('InfoCustomer Management Update Component', () => {
    let comp: InfoCustomerUpdateComponent;
    let fixture: ComponentFixture<InfoCustomerUpdateComponent>;
    let service: InfoCustomerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlowermartTestModule],
        declarations: [InfoCustomerUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(InfoCustomerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InfoCustomerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InfoCustomerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InfoCustomer(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new InfoCustomer();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
