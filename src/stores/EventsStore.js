import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';

class EventsStore extends EventEmitter{
  constructor(){
    super();
    // Store list of all events
    this.events = [];
    // Store data about the event being created/edited
    this.selected = {};
  }

  getEventsList(events){
    this.events = events;
    this.emit('change');
  }

  // createEvent(newEvent){
  //   this.selected = newEvent;
  //   this.emit('change');
  //   console.log("store updated", newEvent)
  // }

  getAll(){
    return this.events;
  }

  getSelected(){
    return this.selected;
  }

  handleActions(action){
    switch(action.type){
      case "GET_EVENTS_LIST": {
        this.getEventsList(action.events);
          console.log('GET_EVENTS_LIST action firing')
      }
      case "EVENT_CREATED": {
  console.log('EVENT_CREATED action firing')
      }
    }
  }

}

const eventsStore = new EventsStore;
// Register store with dispatcher
dispatcher.register(eventsStore.handleActions.bind(eventsStore))

export default eventsStore;
