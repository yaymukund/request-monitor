import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['loading-spinner'],
  isVisible: Ember.computed.readOnly('ajax.isLoading'),
  ajax: Ember.inject.service('ajax-with-loading')
});
