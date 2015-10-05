import Ember from 'ember';
export default Ember.Component.extend({
  request: null,
  index: null,
  tagName: 'tr',
  classNameBindings: [
    'isEven',
    'isOdd',
    'isDifficult',
    'isBusy',
    'isHighlighted'
  ],

  isHighlighted: Ember.computed.and('isDifficult', 'isBusy'),
  isDifficult: Ember.computed('request.[]', function() {
    return this.get('request')[5] > 9000000;
  }),

  isBusy: Ember.computed('request.[]', function() {
    return this.get('request')[3] > 7000000;
  }),

  isEven: Ember.computed('index', function() {
    let index = this.get('index');
    return index % 2 === 0;
  }),

  isOdd: Ember.computed.not('isEven')
});
