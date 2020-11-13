import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InfoCustomerComponentsPage, InfoCustomerDeleteDialog, InfoCustomerUpdatePage } from './info-customer.page-object';

const expect = chai.expect;

describe('InfoCustomer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let infoCustomerComponentsPage: InfoCustomerComponentsPage;
  let infoCustomerUpdatePage: InfoCustomerUpdatePage;
  let infoCustomerDeleteDialog: InfoCustomerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load InfoCustomers', async () => {
    await navBarPage.goToEntity('info-customer');
    infoCustomerComponentsPage = new InfoCustomerComponentsPage();
    await browser.wait(ec.visibilityOf(infoCustomerComponentsPage.title), 5000);
    expect(await infoCustomerComponentsPage.getTitle()).to.eq('flowermartApp.infoCustomer.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(infoCustomerComponentsPage.entities), ec.visibilityOf(infoCustomerComponentsPage.noResult)),
      1000
    );
  });

  it('should load create InfoCustomer page', async () => {
    await infoCustomerComponentsPage.clickOnCreateButton();
    infoCustomerUpdatePage = new InfoCustomerUpdatePage();
    expect(await infoCustomerUpdatePage.getPageTitle()).to.eq('flowermartApp.infoCustomer.home.createOrEditLabel');
    await infoCustomerUpdatePage.cancel();
  });

  it('should create and save InfoCustomers', async () => {
    const nbButtonsBeforeCreate = await infoCustomerComponentsPage.countDeleteButtons();

    await infoCustomerComponentsPage.clickOnCreateButton();

    await promise.all([
      infoCustomerUpdatePage.genderSelectLastOption(),
      infoCustomerUpdatePage.setPhoneInput('phone'),
      infoCustomerUpdatePage.setAddressLine1Input('addressLine1'),
      infoCustomerUpdatePage.setAddressLine2Input('addressLine2'),
      infoCustomerUpdatePage.setCityInput('city'),
      infoCustomerUpdatePage.setCountryInput('country'),
      infoCustomerUpdatePage.userSelectLastOption(),
    ]);

    expect(await infoCustomerUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    expect(await infoCustomerUpdatePage.getAddressLine1Input()).to.eq(
      'addressLine1',
      'Expected AddressLine1 value to be equals to addressLine1'
    );
    expect(await infoCustomerUpdatePage.getAddressLine2Input()).to.eq(
      'addressLine2',
      'Expected AddressLine2 value to be equals to addressLine2'
    );
    expect(await infoCustomerUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await infoCustomerUpdatePage.getCountryInput()).to.eq('country', 'Expected Country value to be equals to country');

    await infoCustomerUpdatePage.save();
    expect(await infoCustomerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await infoCustomerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last InfoCustomer', async () => {
    const nbButtonsBeforeDelete = await infoCustomerComponentsPage.countDeleteButtons();
    await infoCustomerComponentsPage.clickOnLastDeleteButton();

    infoCustomerDeleteDialog = new InfoCustomerDeleteDialog();
    expect(await infoCustomerDeleteDialog.getDialogTitle()).to.eq('flowermartApp.infoCustomer.delete.question');
    await infoCustomerDeleteDialog.clickOnConfirmButton();

    expect(await infoCustomerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
