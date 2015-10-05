import Ember from 'ember';

const PAGE_LIMIT = 100;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  iterator: null,
  requests: [],
  isLoading: false,

  // Are all the store's results on the page?
  isFinished: Ember.computed('store.count', 'requests.length', function() {
    return this.get('store.count') === this.get('requests.length');
  }),

  clear() {
    this.get('requests').clear();
  },

  search(query) {
    let iterator = this.get('store').search(query);
    this.set('iterator', iterator);
    this.clear();
    this.loadMore();
  },

  loadMore() {
    if (this.get('isLoading')) {
      return;
    }

    let store = this.get('store'),
        requests = this.get('requests'),
        iterator = this.get('iterator');

    // Need to fetch data from the server.
    if (this.get('isFinished')) {
      this.set('isLoading', true);
      store.fetchRequests(PAGE_LIMIT).then(results => {
        this.set('isLoading', false);
        requests.pushObjects(results);
      });
      return;
    }

    for (let i=0; i<PAGE_LIMIT; i++) {
      let request = iterator.next().value;
      if (request) {
        requests.pushObject(request);
      }
    }
  }
});
