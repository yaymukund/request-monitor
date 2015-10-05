import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import Progress from '../utils/progress';

export default AjaxService.extend({
  _progresses: [],
  progress: Ember.computed.alias('_progresses.firstObject.progress'),
  isLoading: Ember.computed.notEmpty('_progresses'),

  request(url, options) {
    let _progresses = this.get('_progresses');

    if (options.xhr) {
      // We need to override `xhr` to set `progress`.
      throw new Error("`xhr` parameter can't be present.");
    }

    let progress = new Progress();
    options.xhr = progress.makeXHR.bind(progress);
    _progresses.addObject(progress);

    return this._super(url, options).finally(() => {
      _progresses.removeObject(progress);
    });
  }
});
