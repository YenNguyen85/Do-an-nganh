import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FlowermartTestModule } from '../../../test.module';
import { ContactInfoUpdateComponent } from 'app/entities/contact-info/contact-info-update.component';
import { ContactInfoService } from 'app/entities/contact-info/contact-info.service';
import { ContactInfo } from 'app/shared/model/contact-info.model';

describe('Component Tests', () => {
  describe('ContactInfo Management Update Component', () => {
    let comp: ContactInfoUpdateComponent;
    let fixture: ComponentFixture<ContactInfoUpdateComponent>;
    let service: ContactInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlowermartTestModule],
        declarations: [ContactInfoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ContactInfoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactInfoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactInfoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContactInfo(123);
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
        const entity = new ContactInfo();
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
