import Ember from 'ember';
import startApp from '../helpers/start-app';
import { test, module } from 'qunit';

var application;

const SAVE_BUTTON = 'button.save';
const FIRST_NAME_INPUT_ERROR = '.name-parent-div:eq(0) span.name-input-error';
const FIRST_NAME_INPUT = '.name-parent-div:eq(0) input';

const SECOND_NAME_INPUT_ERROR = '.name-parent-div:eq(1) span.name-input-error';
const SECOND_NAME_INPUT = '.name-parent-div:eq(1) input';

module('Acceptance: Multiple People Unique Name', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('all people must have a unique name', function(assert) {
  visit('/many-single-property');

  andThen(function() {
    assert.equal(find(FIRST_NAME_INPUT_ERROR).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_INPUT_ERROR).hasClass('hidden'), true);
  });

  fillIn(FIRST_NAME_INPUT, '123');
  fillIn(SECOND_NAME_INPUT, '123');

  andThen(function() {
    assert.equal(find(FIRST_NAME_INPUT_ERROR).hasClass('hidden'), true);
    assert.equal(find(SECOND_NAME_INPUT_ERROR).hasClass('hidden'), true);
  });

  click(SAVE_BUTTON);

  andThen(function() {
    assert.equal(find(FIRST_NAME_INPUT_ERROR).hasClass('hidden'), false);
    assert.equal(find(SECOND_NAME_INPUT_ERROR).hasClass('hidden'), false);
  });

  fillIn(FIRST_NAME_INPUT, "bob");

  andThen(function() {
    assert.equal(find(FIRST_NAME_INPUT_ERROR).hasClass('hidden'), true);

    // this should be hidden, how do we do it?
    assert.equal(find(SECOND_NAME_INPUT_ERROR).hasClass('hidden'), true);
  });
});
