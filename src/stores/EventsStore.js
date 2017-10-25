import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';

class EventsStore extends EventEmitter{
  constructor(){
    super();
    this.events = [];
    this.selectedEvent = {
      title: '',
      teaser: '',
      content: '',
      status: true,
      image: '',
      duration: 60,
      isBlocking: ''
    };
  }

  getEventsList(events){
    this.events = events;
    this.emit('change');
  }

  createEvent(newEvent){
    this.selectedEvent = newEvent;
    this.emit('change');
  }

  getSelected(){
    return this.selectedEvent;
  }

  getAll(){
    return this.events;
  }

  handleActions(action){
    switch(action.type){
      case "GET_EVENTS_LIST": {
        this.getEventsList(action.events);
      }
      case "EVENT_CREATED": {
        this.createEvent(action.event);
      }
    }
  }

}

const eventsStore = new EventsStore;
// Register store with dispatcher
dispatcher.register(eventsStore.handleActions.bind(eventsStore))

export default eventsStore;
