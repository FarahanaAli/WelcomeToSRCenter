require('slick-carousel');

const Backbone = require('backbone');
const Marionette = require('backbone.marionette');

const appTpl = require('./app.html');
const carouselTpl = require('./carousel.html');
const day = require('./day.html');
const events = require('../data/events');
const mainTpl = require('./main.html');
const menu = require('../data/menu');
const navTpl = require('./nav.html');
const urls = require('../data/urls');
const videoTpl = require('./video.html');

const { imageUrls } = urls;

const CarouselView = Marionette.View.extend({
  template: () => carouselTpl({ images: imageUrls }),
  
  ui: {
    firstCarousel: '.carousel-1',
    secondCarousel: '.carousel-2',
  },
  
  onAttach() {
    this.ui.firstCarousel.slick({
      autoplay: true,
      centerMode: true,
      variableWidth: true,
    });
    this.ui.secondCarousel.slick({
      autoplay: true,
      centerMode: true,
      variableWidth: true,
      rtl: true,
    })
  }
});

const EventsView = Marionette.View.extend({
  template: mainTpl,
  
  onRender() {
    this.$('ul.days li').each((index, li) => {
      let event;
      
      if (events[index]) {
        event = [events[index].name];
        if (events[index].video) {
          event.push(
            `<a data-video="${events[index].video}" class="open-video-stream ${index === 17 ? 'live' : ''}">${index === 17 ? 'Watch live' : 'Watch'}</a>`
          );
        }
        if (events[index].image) {
          event.push(
            `<img class="event-image" src="${events[index].image}"/>`
          );
        }
      }
      
      let number = index;
      if (number === 0) number = 31;
      if (number > 31) number = number % 31;

      li.innerHTML = day({
        text: event,
        number,
      });
    })
  }
});

const FoodMenuView = Marionette.View.extend({
  template: mainTpl,
  
  onRender() {
    this.$('ul.days li').each((index, li) => {
      let menuOptions;
      if (menu[index]) menuOptions = [`L: ${menu[index].lunch}`, `D: ${menu[index].dinner}`];
      else menuOptions = [''];
      
      let number = index;
      if (number === 0) number = 31;
      if (number > 31) number = number % 31;

      li.innerHTML = day({
        text: menuOptions,
        number,
      });
    })
  }
})

const NavView = Marionette.View.extend({
  template: navTpl,
})

const VideoView = Marionette.View.extend({
  template: videoTpl,
})

const RootView = Marionette.View.extend({
  events: {
    'click #food-menu': function() {
      this.showChildView('main', new FoodMenuView());
    },
    'click #calendar': function() {
      this.showChildView('main', new EventsView())
    },
    'click .open-video-stream': function($event) {
      const videoUrl = $event.currentTarget.getAttribute('data-video');
      const model = new Backbone.Model({
        videoUrl,
      })
      this.showChildView('main', new VideoView({ model }));
    },
    'click .video-close': function() {
      this.showChildView('main', new EventsView());
    },
  },

  regions: {
    nav: '#nav',
    main: '#main',
  },
  
  template: appTpl,
  
  onRender() {
    this.showChildView('nav', new NavView());
    this.showChildView('main', new EventsView());
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