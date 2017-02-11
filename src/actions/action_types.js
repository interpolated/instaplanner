export const GET_COMPARISON = 'GET_COMPARISON'
//requests comparison of metrics from server - stores them in 'comparison' key of state

export const GET_VISUALIZATION = 'GET_VISUALIZATION'
//requests geojson from server

export const SET_POINT_ARRAY = 'SET_POINT_ARRAY'
//gets object (array is a misleading title) of id:[x,y] to send to server

export const SET_ACTIVE_POINT = 'SET_ACTIVE_POINT'
//sets string of mapbox generated id

export const EDIT_ACTIVE_POINT = 'EDIT_ACTIVE_POINT'
//updates properties on the active point using lodash merge => flexibility to add whatever prop at any time.

export const TOGGLE_VISUALIZATION = 'TOGGLE_VISUALIZATION'
// turns on and off visualization by changing layout property on geojson layer
