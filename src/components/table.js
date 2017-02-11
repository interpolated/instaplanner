import React from 'react';
import {Table}  from 'reactstrap';
import {connect}  from 'react-redux';
import R  from 'ramda';
import chroma from 'chroma-js';
import {keysMinMax} from '../selectors/keys_min_max';




const ComparisonTable = (props)=>{
  
  let {comparison,activePoint,keysArray,keysMinMax,pointProps} = props;

  const runningTotal = {totalScore:0}

  const rowMaker = (obj)=>{
    console.log(keysArray)
    runningTotal[obj.id]=0
    // console.log(obj)
    // console.log(activePoint)
    if(activePoint){
      if(activePoint == obj.id){
        return(
          <tr >
            {keysArray.map((key)=>{return coloredCell(key,obj)})}
          </tr>
        )
      }
    }else{
      return(
        <tr >
          {keysArray.map((key)=>{return coloredCell(key,obj)})}
        </tr>)
    }
  }

  const gradient = chroma.scale('RdYlBu').padding(0.15);
  
  const coloredCell = (key,obj) =>{

    if(String(key)!=="id"){      
            const value = obj[key]
            const max = keysMinMax[key].max
            const min = keysMinMax[key].min
            const normalized = Math.round(((value-min)/(max-min))*5)
            // console.log(normalized)
            runningTotal[obj.id]+=normalized
            // console.log(runningTotal)
            // console.log(key+':   min='+min+'     max='+max+'     old val:'+value+'  new val:'+normalized)
            const color = gradient(normalized/5).alpha(0.8).css()
        return(
            <td style={{backgroundColor: color}}>
              <strong>{normalized}</strong><br/>
              <small>{value}</small>
            </td>
        ) 
      }
    if (!R.isEmpty(props.pointProps)){
        // console.log(props.pointProps)
        if(props.pointProps[obj[key]])
        return (
            <th scope="row">{props.pointProps[obj[key]].pointName }</th>
          )}
    return(
        <td>no points</td>      
    )
  }

  //return cell from each key with appropriate normalized color

  return(
    <Table size="sm" responsive>
      <thead>
        <tr>
          {keysArray.map((key)=>{return <th>{key}</th>})}
        </tr>
      </thead>
      <tbody>
          {comparison.map(rowMaker)}
      </tbody>
    </Table>
  )
}

const comparisonActive = (activePoint,comparison)=>{
  if(activePoint){
    return [R.find(R.propEq('id',activePoint))(comparison)]
  }else{
    return comparison||{'nothing':'nothing'}
  }
}

const mapStateToProps = ({comparison,pointProps,activePoint}) => {
    return {
      // comparison: comparisonActive(activePoint,comparison),
      comparison,
      pointProps,
      activePoint,
      keysMinMax:keysMinMax(comparison).keysMinMax,
      keysArray:keysMinMax(comparison).keysArray
    }
}

export default connect(mapStateToProps)(ComparisonTable);