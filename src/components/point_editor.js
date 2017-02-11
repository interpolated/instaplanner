import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {editActivePoint} from '../actions/actions'

const PointEditor = (props) => {

  const {activePoint,editActivePoint,pointProps} = props

  const handler = (e)=>{
    console.log({[e.target.id]:e.target.value})
    console.log(activePoint)
    editActivePoint(activePoint,{[e.target.id]:e.target.value})
  }


  const handleFocus = (event) => {
    event.target.select();
  }


    if(activePoint){
    console.log(pointProps)
    return(
        <div onChange={handler}>
          <FormGroup>
            <Label for='pointName'>Name</Label>
            <Input onFocus={handleFocus} key={activePoint} type="text" id="pointName" defaultValue={pointProps.pointName}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="pointDescription">Text Area</Label>
            <Input onFocus={handleFocus} key={activePoint} type="textarea" name="text" id="pointDescription" defaultValue={pointProps.pointDescription} />
          </FormGroup>
        </div>
    )}
    return(
        <small>No location selected</small>
      )
}

const mapStateToProps=({activePoint,pointProps})=>{
  return({
    activePoint,  
    pointProps:pointProps[activePoint]
  })
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({editActivePoint},  dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PointEditor)