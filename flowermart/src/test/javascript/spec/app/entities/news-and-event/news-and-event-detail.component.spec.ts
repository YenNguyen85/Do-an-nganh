import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { FlowermartTestModule } from '../../../test.module';
import { NewsAndEventDetailComponent } from 'app/entities/news-and-event/news-and-event-detail.component';
import { NewsAndEvent } from 'app/shared/model/news-and-event.model';

describe('Component Tests', () => {
  describe('NewsAndEvent Management Detail Component', () => {
    let comp: NewsAndEventDetailComponent;
    let fixture: ComponentFixture<NewsAndEventDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ newsAndEvent: new NewsAndEvent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlowermartTestModule],
        declarations: [NewsAndEventDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NewsAndEventDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NewsAndEventDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load newsAndEvent on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.newsAndEvent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
