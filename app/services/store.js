/* global Papa */
import Ember from 'ember';
import ENV from '../config/environment';

let isMatch = (request, query) => {
  query = query.toLowerCase();
  return request.some(stat => {
    return stat.toString().includes(query);
  });
};

export default Ember.Service.extend({
  ajax: Ember.inject.service('ajax-with-loading'),
  count: Ember.computed.readOnly('_requests.length'),
  hasError: false,
  _requests: [],

  search: function*(query) {
    let _requests = this.get('_requests'),
        i;

    for (i=0; i < _requests.length; i++) {
      if (!query || isMatch(_requests[i], query)) {
        yield _requests[i];
      }
    }
  },

  fetchRequestsCache(url, options={dataType: 'text'}) {
    return this.get('ajax').request(url, options).then(response => {
      let _requests = this.get('_requests');
      response = Papa.parse(response, { skipEmptyLines: true });
      _requests.pushObjects(response.data);
      return _requests;
    }, this._didError.bind(this));
  },

  fetchRequests(limit) {
    let offset = this.get('_requests.length');

    return this.get('ajax').request(ENV.serverURL, {
      data: {
        offset: offset,
        limit: limit
      }
    }).then(response => {
      this.get('_requests').pushObjects(response);
      return response;
    }, this._didError.bind(this));
  },

  _didError() {
    this.set('hasError', true);
  }
});
