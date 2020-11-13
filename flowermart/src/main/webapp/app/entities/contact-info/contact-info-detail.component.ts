import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactInfo } from 'app/shared/model/contact-info.model';

@Component({
  selector: 'jhi-contact-info-detail',
  templateUrl: './contact-info-detail.component.html',
})
export class ContactInfoDetailComponent implements OnInit {
  contactInfo: IContactInfo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactInfo }) => (this.contactInfo = contactInfo));
  }

  previousState(): void {
    window.history.back();
  }
}
