const Marionette = require('backbone.marionette');
const appTpl = require('./app.html');
const mainTpl = require('./main.html');
const navTpl = require('./nav.html');

const events = require('../events');
// const menu = require('../menu');

const MainView = Marionette.View.extend({
  template: mainTpl,
})

const NavView = Marionette.View.extend({
  template: navTpl,
})

const RootView = Marionette.View.extend({
  regions: {
    nav: '#nav',
    main: '#main',
  },
  
  template: appTpl,
  
  onRender() {
    this.showChildView('nav', new NavView());
    this.showChildView('main', new MainView());
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