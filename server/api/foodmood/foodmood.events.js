/**
 * Foodmood model events
 */

'use strict';

import {EventEmitter} from 'events';
import Foodmood from './foodmood.model';
var FoodmoodEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FoodmoodEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Foodmood.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FoodmoodEvents.emit(event + ':' + doc._id, doc);
    FoodmoodEvents.emit(event, doc);
  }
}

export default FoodmoodEvents;
