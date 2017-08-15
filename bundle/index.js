const Marionette = require('backbone.marionette');
const appTpl = require('./app.hbs');

console.log(appTpl);

const RootView = Marionette.View.extend({
  template: appTpl,
  
  onShow() {
    this.$el.innerHTML = 'yo';
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
})