import React from 'react';
import {Row, Col, Button,ButtonGroup,Navbar} from 'reactstrap';
import DisplayMap from './display_map.js'
import {Header} from './header.js'
import PointEditor from './point_editor.js'
import {getComparison,getVisualization,toggleVisualization} from '../actions/actions'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import ComparisonTable from './table';





const MapSection = (props) =>{
  const comparison = () =>{
    console.log(props.pointArray)
  props.getComparison(props.pointArray)
  }
  const visualize = () =>{
  props.getVisualization(props.pointArray)
  }

  return(
    <div id='mapsection'>  
      <Row className='full'>
        <Col className="full nopadding" xs="8">
          <DisplayMap
            style='mapbox://styles/mapbox/satellite-v9'
            containerStyle={{ height: '100%', width: '100%' }}
            accessToken='pk.eyJ1IjoiZ2FydGhkYmVldGxlIiwiYSI6ImNpcHl5emhrdjB5YmxoY25yczF6MHhhc2IifQ.2Ld30uLqcffVv-RUAWk_qQ'/>
        </Col>
        <Col className='full' xs="4" id="sidebar">
              <Header/>
              <div id="buttons">
                <br/>
                <h6>Click to compare locations.</h6>
                <p>
                </p>
                <p>
                  <ButtonGroup>
                    <Button color="info" size="sm" onClick={comparison}>Compare!</Button>   
                    <Button color="warning" size="sm" onClick={visualize}>Visualize! (slow)</Button>
                    <Button color="primary" size="sm" onClick={props.toggleVisualization}>Toggle visibility!</Button>
                  </ButtonGroup>
                </p>
              </div>
              <div id="PointEditor">
              <h6>Location Information</h6>
                <PointEditor />
              </div>
      </Col>
      </Row>
      <Row id="table">
           <Col xs="12">
              <ComparisonTable/>
           </Col>
      </Row>
    </div>
  )
}



const mapStateToProps = ( {pointArray} ) => {
return {pointArray:pointArray}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getComparison, getVisualization,toggleVisualization},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(MapSection)