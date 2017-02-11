// must be a list of actions
//actions for a single project
import { TOGGLE_VISUALIZATION,EDIT_ACTIVE_POINT, SET_ACTIVE_POINT, GET_COMPARISON, SET_POINT_ARRAY,GET_VISUALIZATION } from './action_types.js'
import {ajax} from 'jquery';
import {keysMinMax} from '../selectors/keys_min_max'
import {keyNormalizor} from '../selectors/keys_normalizor'
import {merge} from 'lodash';

function comparisonCall(pointArray){
  return ajax({
  type:'POST',
  dataType: "json",
  url: 'http://localhost:5000/compareRequest',
  contentType: 'application/json; charset=UTF-8', // This is the money shot
  data:JSON.stringify(pointArray),
  });
}

function visualizationCall(pointArray){
  return ajax({
  type:'POST',
  dataType: "json",
  url: 'http://localhost:5000/constraintGeom',
  contentType: 'application/json; charset=UTF-8', // This is the money shot
  data:JSON.stringify(pointArray),
  });
} 

export function setPointArray(pointArray){
  return {
    type: SET_POINT_ARRAY,
    payload:pointArray
  }

}

export function getComparison(pointArray){
  const request = comparisonCall(pointArray)
  return (dispatch) =>{
    request.then((data)=>{
          console.log(data)

          // //get keysMinMax
          const cMinMax = keysMinMax(data)
          console.log(cMinMax)
          // //add normalizedScore to each comparison
          var newData = data.map((obj)=>{return (
              merge(obj,{locationScore:keyNormalizor(obj,cMinMax.keysMinMax)})
            )})

          const UpdatedData = merge(data,newData)
          console.log(UpdatedData)

          return dispatch({
            type: GET_COMPARISON,
            payload:data
          })      
    })
  }
}

export function getVisualization(pointArray){
  const request = visualizationCall(pointArray)
  return (dispatch) =>{
    request.then((data)=>{
          dispatch({
            type: GET_VISUALIZATION,
            payload:data
          })      
    })
  }
}

export function setActivePoint(id) {
  return {
    type:SET_ACTIVE_POINT,
    payload:id
  }
}

export function editActivePoint(id,payload) {
  return{
    type:EDIT_ACTIVE_POINT,
    id,
    payload
  } 
}

export function toggleVisualization(){
  return {
    type:TOGGLE_VISUALIZATION
  }
}