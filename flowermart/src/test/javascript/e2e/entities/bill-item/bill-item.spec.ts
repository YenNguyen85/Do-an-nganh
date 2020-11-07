import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BillItemComponentsPage, BillItemDeleteDialog, BillItemUpdatePage } from './bill-item.page-object';

const expect = chai.expect;

describe('BillItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let billItemComponentsPage: BillItemComponentsPage;
  let billItemUpdatePage: BillItemUpdatePage;
  let billItemDeleteDialog: BillItemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load BillItems', async () => {
    await navBarPage.goToEntity('bill-item');
    billItemComponentsPage = new BillItemComponentsPage();
    await browser.wait(ec.visibilityOf(billItemComponentsPage.title), 5000);
    expect(await billItemComponentsPage.getTitle()).to.eq('flowermartApp.billItem.home.title');
    await browser.wait(ec.or(ec.visibilityOf(billItemComponentsPage.entities), ec.visibilityOf(billItemComponentsPage.noResult)), 1000);
  });

  it('should load create BillItem page', async () => {
    await billItemComponentsPage.clickOnCreateButton();
    billItemUpdatePage = new BillItemUpdatePage();
    expect(await billItemUpdatePage.getPageTitle()).to.eq('flowermartApp.billItem.home.createOrEditLabel');
    await billItemUpdatePage.cancel();
  });

  it('should create and save BillItems', async () => {
    const nbButtonsBeforeCreate = await billItemComponentsPage.countDeleteButtons();

    await billItemComponentsPage.clickOnCreateButton();

    await promise.all([
      billItemUpdatePage.setQuantityInput('5'),
      billItemUpdatePage.setTotalPriceInput('5'),
      billItemUpdatePage.statusSelectLastOption(),
      billItemUpdatePage.billSelectLastOption(),
      billItemUpdatePage.productSelectLastOption(),
    ]);

    expect(await billItemUpdatePage.getQuantityInput()).to.eq('5', 'Expected quantity value to be equals to 5');
    expect(await billItemUpdatePage.getTotalPriceInput()).to.eq('5', 'Expected totalPrice value to be equals to 5');

    await billItemUpdatePage.save();
    expect(await billItemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await billItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last BillItem', async () => {
    const nbButtonsBeforeDelete = await billItemComponentsPage.countDeleteButtons();
    await billItemComponentsPage.clickOnLastDeleteButton();

    billItemDeleteDialog = new BillItemDeleteDialog();
    expect(await billItemDeleteDialog.getDialogTitle()).to.eq('flowermartApp.billItem.delete.question');
    await billItemDeleteDialog.clickOnConfirmButton();

    expect(await billItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
