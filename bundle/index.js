const Marionette = require('backbone.marionette');
const appTpl = require('./app.html');
const mainTpl = require('./main.html');
const navTpl = require('./nav.html');

const events = require('../data/events');
const menu = require('../data/menu');
const day = require('./day.html');

const MainView = Marionette.View.extend({
  template: mainTpl,
  
  onRender() {
    this.$('ul.days li').each((index, li) => {
      let event;
      if (events[index]) event = events[index];
      else event = '';
      li.innerHTML = day({
        text: event,
        number: (index > 0 ? index : ''),
      });
    })
  }
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
  },
});

const app = new App();

document.addEventListener('DOMContentLoaded', () => app.start());