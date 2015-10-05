import Ember from 'ember';
const MOBILE_USER_AGENTS = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export default Ember.Component.extend({
  classNames: ['infinite-scroll'],
  // This is bad but I think it's unavoidable (except by avoiding infinite
  // scroll entirely).
  isMobile: Ember.computed(function() {
    return MOBILE_USER_AGENTS.test(navigator.userAgent);
  }),

  didScroll() {
    let $window = this.get('$window'),
        $document = this.get('$document');

    if ($window.scrollTop() >= $document.height() - $window.height() - 500) {
      this.get('attrs.onScroll')();
    }
  },

  teardown: Ember.on('willDestroyElement', function() {
    this.get('$window').off(`scroll.${this.get('elementId')}`);
  }),

  setupListeners: Ember.on('didInsertElement', function() {
    if (this.get('isMobile')) {
      // Use a button!
      return;
    }

    let $window = this.$(window),
        $document = this.$(document);

    this.set('$window', $window);
    this.set('$document', $document);

    $window.on(`scroll.${this.get('elementId')}`, this.didScroll.bind(this));
  })
});
