import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FlowermartTestModule } from '../../../test.module';
import { NewsAndEventComponent } from 'app/entities/news-and-event/news-and-event.component';
import { NewsAndEventService } from 'app/entities/news-and-event/news-and-event.service';
import { NewsAndEvent } from 'app/shared/model/news-and-event.model';

describe('Component Tests', () => {
  describe('NewsAndEvent Management Component', () => {
    let comp: NewsAndEventComponent;
    let fixture: ComponentFixture<NewsAndEventComponent>;
    let service: NewsAndEventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlowermartTestModule],
        declarations: [NewsAndEventComponent],
      })
        .overrideTemplate(NewsAndEventComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NewsAndEventComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NewsAndEventService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NewsAndEvent(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.newsAndEvents && comp.newsAndEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
