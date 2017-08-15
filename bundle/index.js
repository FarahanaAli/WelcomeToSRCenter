const Marionette = require('backbone.marionette')

const RootView = Marionette.View.extend({
  onShow() {
    this.$el.
  }
})

const App = Marionette.Application.extend({
  region: '#root',
  onStart() {
    this.showView(new RootView())
  }
})

const app = new Marionette.Application();

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  
})