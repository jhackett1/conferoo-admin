import dispatcher from '../dispatcher/dispatcher';
import eventApi from '../api/eventApi';

export function getEventsList(){
  dispatcher.dispatch({type: "FETCHING_DATA"})

  console.log('action dispatched')

  eventApi.getEventsList((eventsList)=>{
    dispatcher.dispatch({
      type: "GET_EVENTS_LIST",
      events: eventsList
    })
  })
}


export function createEvent(newEvent){
  dispatcher.dispatch({type: "FETCHING_DATA"})

  console.log('action dispatched')

  eventApi.createEvent(newEvent, (createdEvent)=>{
    dispatcher.dispatch({
      type: "EVENT_CREATED",
      event: createdEvent
    })
  })
}
