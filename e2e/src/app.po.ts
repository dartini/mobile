import { browser, by, element } from 'protractor';

export class AppPage {

  public navigateTo(): void {
    return browser.get('/');
  }

  public getParagraphText(): void {
    return element(by.css('app-root h1')).getText();
  }
}
