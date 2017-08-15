const Marionette = require('backbone.marionette');
const appTpl = require('./app.html');
const mainTpl = require('./main.html');
const navTpl = require('./nav.html');

const MainView = Marionette.View.extend({
  template: mainTpl,
})

const NavView = Marionette.View.extend({
  template: navTpl,
})

const RootView = Marionette.LayoutView.extend({
  regions: {
    nav: '#nav',
    main: '#main',
  },
  
  template: appTpl,
  
  onShow() {
    this.nav.show(new NavView());
    this.main.show(new MainView());
  }
})

const App = Marionette.Application.extend({
  region: '#root',
  
  onStart() {
    this.showView(new RootView())
  }
})

const app = new App();

document.addEventListener('DOMContentLoaded', () => {
  app.start();
});