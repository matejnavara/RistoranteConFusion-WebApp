import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(link: string) {
    return browser.get(link);
  }
  
  getParagraphText(selector: string) {
    return element(by.css(selector)).getText();
  }

  getElement(selector: string) {
    return element(by.css(selector));
  }

  getElementId(id: string) {
    return element(by.id(id));
  }

  getAllElements(selector: string) {
    return element.all(by.css(selector));
  }
}
