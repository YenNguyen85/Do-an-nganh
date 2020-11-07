import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FlowermartTestModule } from '../../../test.module';
import { ContactInfoDetailComponent } from 'app/entities/contact-info/contact-info-detail.component';
import { ContactInfo } from 'app/shared/model/contact-info.model';

describe('Component Tests', () => {
  describe('ContactInfo Management Detail Component', () => {
    let comp: ContactInfoDetailComponent;
    let fixture: ComponentFixture<ContactInfoDetailComponent>;
    const route = ({ data: of({ contactInfo: new ContactInfo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlowermartTestModule],
        declarations: [ContactInfoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ContactInfoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactInfoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contactInfo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contactInfo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
