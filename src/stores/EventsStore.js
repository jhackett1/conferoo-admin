import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';

class EventsStore extends EventEmitter{
  constructor(){
    super();
    this.events = [];
  }

  getEventsList(events){
    this.events = events;
    this.emit('change');
  }

  getAll(){
    return this.events;
  }

  handleActions(action){
    switch(action.type){
      case "GET_EVENTS_LIST": {
        this.getEventsList(action.events);
      }
    }
  }

}

const eventsStore = new EventsStore;
// Register store with dispatcher
dispatcher.register(eventsStore.handleActions.bind(eventsStore))

export default eventsStore;
