import Ember from 'ember';
import Ajax from 'impact-monitor/services/ajax-with-loading';

const METHODS = [
  'delete',
  'options',
  'patch',
  'put',
  'post',
  'get'
];

function makeRow(id) {
  return [
    id,
    METHODS[Math.floor(Math.random() * METHODS.length)],
    'http://example.com/path/'+id,
    getRandomInt(100000, 9999999),
    getRandomInt(100000, 9999999),
    getRandomInt(100000, 9999999)
  ];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function serialize(response) {
  return response
    .map(row => { return row.join(','); })
    .join('\n');
}

export default Ajax.extend({
  request(_, options={}) {
    let results = [],
        data = options.data || {},
        offset = data.offset || 0,
        limit = data.limit || 100,
        i;

    for (i=0; i<limit; i++) {
      let row = makeRow(offset+i);
      results.push(row);
    }

    if (options.dataType === 'text') {
      results = serialize(results);
    }

    return Ember.RSVP.resolve(results);
  }
});
