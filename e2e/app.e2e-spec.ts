import { Angular2RxJSPage } from './app.po';

describe('angular2-rx-js App', function() {
  let page: Angular2RxJSPage;

  beforeEach(() => {
    page = new Angular2RxJSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
