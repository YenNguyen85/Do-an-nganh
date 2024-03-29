import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FlowermartTestModule } from '../../../test.module';
import { BillItemDetailComponent } from 'app/entities/bill-item/bill-item-detail.component';
import { BillItem } from 'app/shared/model/bill-item.model';

describe('Component Tests', () => {
  describe('BillItem Management Detail Component', () => {
    let comp: BillItemDetailComponent;
    let fixture: ComponentFixture<BillItemDetailComponent>;
    const route = ({ data: of({ billItem: new BillItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlowermartTestModule],
        declarations: [BillItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BillItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BillItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load billItem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.billItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
