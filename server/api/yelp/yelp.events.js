/**
 * Yelp model events
 */

'use strict';

import {EventEmitter} from 'events';
import Yelp from './yelp.model';
var YelpEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
YelpEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Yelp.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    YelpEvents.emit(event + ':' + doc._id, doc);
    YelpEvents.emit(event, doc);
  }
}

export default YelpEvents;
