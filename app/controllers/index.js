import Ember from 'ember';

export default Ember.Controller.extend({
  dashboard: Ember.inject.service(),
  hasError: Ember.computed.alias('dashboard.store.hasError'),
  ajax: Ember.inject.service('ajax-with-loading'),

  actions: {
    loadMore() {
      let dashboard = this.get('dashboard');
      Ember.run.throttle(dashboard, 'loadMore', 150);
    },

    closeError() {
      this.set('hasError', false);
    }
  }
});
