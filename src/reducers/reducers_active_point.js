import {SET_ACTIVE_POINT,EDIT_ACTIVE_POINT} from '../actions/action_types.js'
import {merge} from 'lodash';

export function setActivePoint(state = '', action){
  switch(action.type){
  
  case SET_ACTIVE_POINT:
    return action.payload
  default:
    return state
  }
}

export function editActivePoint(state = {}, action){
  switch(action.type){
  
  case EDIT_ACTIVE_POINT:
    // const payload = merge({pointName:'',pointDescription:''},action.payload)
    if (action.id !== undefined)
    {return merge(state,{[action.id]: action.payload})}
    else{
      console.log('error!')
      return state}
  default:
    return state
  }
}
