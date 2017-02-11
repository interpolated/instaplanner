import { TOGGLE_VISUALIZATION, GET_COMPARISON,SET_POINT_ARRAY,GET_VISUALIZATION } from '../actions/action_types.js'

const testComparison = [{"open_space_count":0,"non_constrained_area":13868,"open_space_area":0,"id":"0","cadastre_count":45,"non_constrained_count":44},{"open_space_count":0,"non_constrained_area":0,"open_space_area":0,"id":"2","cadastre_count":235,"non_constrained_count":185},{"open_space_count":2,"non_constrained_area":53673,"open_space_area":5530,"id":"1","cadastre_count":2061,"non_constrained_count":650}]

export function getComparison(state = testComparison, action){
  switch(action.type){
  
  case GET_COMPARISON:
    return action.payload
  default:
    return state
  }
}

export function getVisualization(state = {type:"FeatureCollection",features:[]}, action){
  switch(action.type){
  
  case GET_VISUALIZATION:
    return action.payload
  default:
    return state
  }
}

export function setPointArray(state = {}, action){
  switch(action.type){
  
  case SET_POINT_ARRAY:
    return action.payload
  default:
    return state
  }
}

export function toggleVisualization(state=true,action) {
  switch(action.type){
    case TOGGLE_VISUALIZATION:
    return !state
  default:
    return state
  }

}