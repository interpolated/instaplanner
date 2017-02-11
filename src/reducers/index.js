import {combineReducers} from 'redux';
import {getComparison,setPointArray,getVisualization,toggleVisualization} from './reducers_get_data';
import {setActivePoint,editActivePoint}  from './reducers_active_point';


const rootReducer = combineReducers(
      {
        comparison:getComparison,
        pointArray:setPointArray,
        visualization:getVisualization,
        activePoint:setActivePoint,
        pointProps:editActivePoint,
        visualizationOn:toggleVisualization
      }
  );


export default rootReducer;
