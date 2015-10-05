import Ember from 'ember';

export default Ember.Component.extend({
  dashboard: Ember.inject.service(),

  updateQuery() {
    let query = this.get('query');
    this.get('dashboard').search(query);
  },

  actions: {
    search() {
      Ember.run.debounce(this, 'updateQuery', 300);
    }
  }
});
