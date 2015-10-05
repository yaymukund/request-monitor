import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Ajax from '../mocks/ajax-service';

let application;

module('Acceptance | initial load', {
  beforeEach() {
    application = startApp();
    application.register('service:mockAjax', Ajax);
    application.inject('controller:index', 'ajax', 'service:mockAjax');
    application.inject('service:store', 'ajax', 'service:mockAjax');
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /', function(assert) {
  visit('/');
  andThen(() => {
    assert.ok(true);
  });
});

test('clicking to /help', function(assert) {
  visit('/');
  click('a.help');
  andThen(() => {
    assert.ok(currentRouteName() === 'index.help', "can't open help");
  });
});

test('initial list of requests', function(assert) {
  visit('/');
  andThen(() => {
    assert.ok(find('tr').length === 101, "didn't load 101 rows");
  });
});

test('triggering infinite scroll', function(assert) {
  visit('/');

  andThen(() => {
    let $el = find('.infinite-scroll');
    $el.scrollTop(2000);
    triggerEvent('.infinite-scroll', 'scroll');
  });

  andThen(() => {
    assert.ok(find('tr').length === 201, "didn't load 100 more rows");
  });
});

test('filtering records', function(assert) {
  visit('/');
  fillIn('input#search', 'DELETE');
  triggerEvent('input#search', 'input');
  andThen(() => {
    let isAllDeletes = find('td.method').map((i, $method) => {
      return $method.textContent;
    }).toArray().every(m => {
      return m === 'delete';
    });

    assert.ok(isAllDeletes, 'search results contain a non-DELETE');
  });
});
