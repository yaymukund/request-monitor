import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  dashboard: Ember.inject.service(),

  queryParams: {
    mode: { replace: false }
  },

  model(params) {
    let url = params.mode === 'cached' ? ENV.dataURL : ENV.dataPreviewURL;
    this.get('store').fetchRequestsCache(url).then(() => {
      this.get('dashboard').search();
    });
  },

  actions: {
    closeHelp() {
      this.transitionTo('index');
    }
  }
});
