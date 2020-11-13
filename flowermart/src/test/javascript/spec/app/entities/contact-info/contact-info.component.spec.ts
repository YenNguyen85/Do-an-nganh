import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FlowermartTestModule } from '../../../test.module';
import { ContactInfoComponent } from 'app/entities/contact-info/contact-info.component';
import { ContactInfoService } from 'app/entities/contact-info/contact-info.service';
import { ContactInfo } from 'app/shared/model/contact-info.model';

describe('Component Tests', () => {
  describe('ContactInfo Management Component', () => {
    let comp: ContactInfoComponent;
    let fixture: ComponentFixture<ContactInfoComponent>;
    let service: ContactInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlowermartTestModule],
        declarations: [ContactInfoComponent],
      })
        .overrideTemplate(ContactInfoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactInfoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactInfoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ContactInfo(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.contactInfos && comp.contactInfos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
