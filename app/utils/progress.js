import Ember from 'ember';

export default Ember.Object.extend({
  progress: 0,

  onProgress(event) {
    if (event.lengthComputable) {
      this.set('progress', event.loaded / event.total);
    }
  },

  makeXHR() {
    let xhr = new XMLHttpRequest(),
        onProgress = this.onProgress.bind(this);
    xhr.addEventListener('progress', onProgress, false);
    return xhr;
  }
});
