import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NewsAndEventComponentsPage, NewsAndEventDeleteDialog, NewsAndEventUpdatePage } from './news-and-event.page-object';

const expect = chai.expect;

describe('NewsAndEvent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let newsAndEventComponentsPage: NewsAndEventComponentsPage;
  let newsAndEventUpdatePage: NewsAndEventUpdatePage;
  let newsAndEventDeleteDialog: NewsAndEventDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NewsAndEvents', async () => {
    await navBarPage.goToEntity('news-and-event');
    newsAndEventComponentsPage = new NewsAndEventComponentsPage();
    await browser.wait(ec.visibilityOf(newsAndEventComponentsPage.title), 5000);
    expect(await newsAndEventComponentsPage.getTitle()).to.eq('flowermartApp.newsAndEvent.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(newsAndEventComponentsPage.entities), ec.visibilityOf(newsAndEventComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NewsAndEvent page', async () => {
    await newsAndEventComponentsPage.clickOnCreateButton();
    newsAndEventUpdatePage = new NewsAndEventUpdatePage();
    expect(await newsAndEventUpdatePage.getPageTitle()).to.eq('flowermartApp.newsAndEvent.home.createOrEditLabel');
    await newsAndEventUpdatePage.cancel();
  });

  it('should create and save NewsAndEvents', async () => {
    const nbButtonsBeforeCreate = await newsAndEventComponentsPage.countDeleteButtons();

    await newsAndEventComponentsPage.clickOnCreateButton();

    await promise.all([
      newsAndEventUpdatePage.setTitleInput('title'),
      newsAndEventUpdatePage.setContentInput('content'),
      newsAndEventUpdatePage.setTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
    ]);

    expect(await newsAndEventUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await newsAndEventUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await newsAndEventUpdatePage.getTimeInput()).to.contain('2001-01-01T02:30', 'Expected time value to be equals to 2000-12-31');

    await newsAndEventUpdatePage.save();
    expect(await newsAndEventUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await newsAndEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last NewsAndEvent', async () => {
    const nbButtonsBeforeDelete = await newsAndEventComponentsPage.countDeleteButtons();
    await newsAndEventComponentsPage.clickOnLastDeleteButton();

    newsAndEventDeleteDialog = new NewsAndEventDeleteDialog();
    expect(await newsAndEventDeleteDialog.getDialogTitle()).to.eq('flowermartApp.newsAndEvent.delete.question');
    await newsAndEventDeleteDialog.clickOnConfirmButton();

    expect(await newsAndEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
