import dispatcher from '../dispatcher/dispatcher';
import eventApi from '../api/eventApi';

export function getEventsList(){
  dispatcher.dispatch({type: "FETCHING_DATA"})
  eventApi.getEventsList((eventsList)=>{
    dispatcher.dispatch({
      type: "GET_EVENTS_LIST",
      events: eventsList
    })
  })
}
