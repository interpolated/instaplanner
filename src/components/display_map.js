import React,{Component} from 'react';
import ReactMapboxGl,{GeoJSONLayer,Marker} from 'react-mapbox-gl';
import MapboxDraw from 'MapboxDraw';
// import MapboxDraw from '@mapbox/dist/mapbox-gl-draw'
import R from 'ramda'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {setPointArray,setActivePoint,editActivePoint} from '../actions/actions'
import chroma from 'chroma-js';
class DisplayMap extends Component {
//onclick updates pointArray part of store
//todo: see if I can set draw() to load up buildings on the map (from state (should be possible))

  componentWillMount(){
    console.log(MapboxDraw)
    this.setState({
      center :[151.2026363562161,-33.809532754786325]
    })
    this.setState({selectedId:''})
  }

  _polygonClicked = ({ feature }) => {
  // console.log('Polygon clicked', feature.geometry.coordinates);
  };

  _onStyleLoad = (map, event) => {
    const draw = new MapboxDraw();
    map.addControl(draw);
    this.setState({draw:draw})
  }
  
  paint =  {
    "fill-color": {
        "property": "constraint_type",
        "stops": [
            [0, '#3061EE'],
            [1, "LightGreen"], //open space
            [2, "Orange"], // special use
            [3, "mediumSpringGreen"], //env conservation
            [4, "orangeRed"], // strata 10
            [5, "tomato"], // strata 9
            [6, "red"], // recent deve
            [7, "mediumSeaGreen"], // conservation area
            [8, "lightsalmon"], //heritage
            [10,"forestGreen"], // tec communities 
            [11,"lightblue"], //anef
            [12,"darkblue"],//anef
            [13,"darkblue"]//anef
            ]
        },
      "fill-opacity":0.7
      }


  getGeomFromFeature = (obj)=>{
    const id= R.path(['id'],obj)
    const a = R.pipe(
    R.path(['geometry']),
    R.path(['coordinates'])
    )(obj)
    return {[id]:a}
  }

  _onClick = () => {
      // console.log(this.state.draw.getAll())
      let data = (this.state.draw.getAll().features.map(this.getGeomFromFeature))
      // console.log(R.mergeAll(data))
      data = R.mergeAll(data)
      this.setState({points:data})
      this.props.setPointArray(this.state.points)

      const selectedId = this.state.draw.getSelectedIds()
      // console.log(selectedId[0])
      this.props.editActivePoint(selectedId[0],{})
      if(R.isEmpty(this.props.pointProps[selectedId[0]])){
            this.props.editActivePoint(selectedId[0],{pointName:'name needed',pointDescription:'description needed'})}
      this.props.setActivePoint(selectedId[0]||'');
      this.setState({selectedId:selectedId[0]||''})
  }

  _onClickDiv= (x,id)=>{
    console.log(x)
    console.log(id)
    this.props.setActivePoint(x);  
    }

  vis = (on)=>{
    if (on){
        return {}
    }else{
        return {"visibility":'none'}
    } 
  }



    gradient = chroma.scale('RdYlBu').padding(0.15);

  addMarker = (obj)=>{
    if(this.props.pointArray[obj.id]==undefined){
        return
    }
    if(this.props.pointProps[obj.id]==undefined){
        return
    }

    const minMax = this.props.comparison.map((obj)=>{return obj.locationScore})
    const min = Math.min.apply(Math, minMax)
    const max = Math.max.apply(Math, minMax)
    console.log(this.props.pointProps[obj.id])
    console.log(obj)

    return(
            <Marker
              id={obj.id}
              style={{"cursor":"pointer"}}
              onClick = {this._onClickDiv.bind(this,obj.id)}
              coordinates={this.props.pointArray[obj.id]}
              anchor="bottom">
              <div className='markerContainer'>
                <div className="pin" style={{'backgroundColor':this.gradient(((obj.locationScore-min)/(max-min))).css()}}>
                  </div>
                    <div className="scoreText">
                        <strong>{obj.locationScore}</strong>
                    </div>
                  <div  className='nameText'>
                     <div>
                          <small>{this.props.pointProps[obj.id].pointName}</small>
                     </div>
                  </div>
              </div>
              </Marker>
            )
  }

  render() {
    // console.log(this.props.visualization)
    return (
    <div className='App'>
      <div className='App-header'>
      </div>
      <ReactMapboxGl
        style={'mapbox://styles/mapbox/light-v9'}
        center={this.state.center}
        onStyleLoad={this._onStyleLoad}
        // zoom={[13]}  this zoom is reset every time a user clicks (because state is updated, so leave commented)
        accessToken={this.props.accessToken}
        containerStyle={this.props.containerStyle}
        // onStyleLoad={this._onStyleLoad}
        onClick={this._onClick}
        ref='map'>
        <GeoJSONLayer
            key={this.vis(this.props.visualizationOn).visibility} 
            fillLayout={this.vis(this.props.visualizationOn)} 
            data={this.props.visualization} 
            circleLayout={{"visibility":'none'}} 
            lineLayout ={{"visibility":'none'}} 
            symbolLayout={{"visibility":'none'}} 
            fillPaint={this.paint}>
        </GeoJSONLayer>
        {this.props.comparison.map((obj)=>{return this.addMarker(obj)})}
      </ReactMapboxGl>
    </div>
  );
  }
}

const mapStateToProps = ( {visualization,activePoint,pointProps,visualizationOn,comparison, pointArray} ) => {
  return {visualization,activePoint,pointProps,visualizationOn,comparison, pointArray}
}



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setPointArray,setActivePoint,editActivePoint}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(DisplayMap);