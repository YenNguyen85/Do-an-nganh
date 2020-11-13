import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContactInfoComponentsPage, ContactInfoDeleteDialog, ContactInfoUpdatePage } from './contact-info.page-object';

const expect = chai.expect;

describe('ContactInfo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contactInfoComponentsPage: ContactInfoComponentsPage;
  let contactInfoUpdatePage: ContactInfoUpdatePage;
  let contactInfoDeleteDialog: ContactInfoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ContactInfos', async () => {
    await navBarPage.goToEntity('contact-info');
    contactInfoComponentsPage = new ContactInfoComponentsPage();
    await browser.wait(ec.visibilityOf(contactInfoComponentsPage.title), 5000);
    expect(await contactInfoComponentsPage.getTitle()).to.eq('flowermartApp.contactInfo.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(contactInfoComponentsPage.entities), ec.visibilityOf(contactInfoComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ContactInfo page', async () => {
    await contactInfoComponentsPage.clickOnCreateButton();
    contactInfoUpdatePage = new ContactInfoUpdatePage();
    expect(await contactInfoUpdatePage.getPageTitle()).to.eq('flowermartApp.contactInfo.home.createOrEditLabel');
    await contactInfoUpdatePage.cancel();
  });

  it('should create and save ContactInfos', async () => {
    const nbButtonsBeforeCreate = await contactInfoComponentsPage.countDeleteButtons();

    await contactInfoComponentsPage.clickOnCreateButton();

    await promise.all([contactInfoUpdatePage.setEmailInput('O+F~c@y!WD*B.Z|'), contactInfoUpdatePage.setPhoneInput('phone')]);

    expect(await contactInfoUpdatePage.getEmailInput()).to.eq('O+F~c@y!WD*B.Z|', 'Expected Email value to be equals to O+F~c@y!WD*B.Z|');
    expect(await contactInfoUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');

    await contactInfoUpdatePage.save();
    expect(await contactInfoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await contactInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ContactInfo', async () => {
    const nbButtonsBeforeDelete = await contactInfoComponentsPage.countDeleteButtons();
    await contactInfoComponentsPage.clickOnLastDeleteButton();

    contactInfoDeleteDialog = new ContactInfoDeleteDialog();
    expect(await contactInfoDeleteDialog.getDialogTitle()).to.eq('flowermartApp.contactInfo.delete.question');
    await contactInfoDeleteDialog.clickOnConfirmButton();

    expect(await contactInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
