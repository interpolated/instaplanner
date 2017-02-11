import React from 'react';
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import ReactMapboxGl from 'react-mapbox-gl';

class DrawMap extends React.Component {

    componentWillMount(){
        this.setState({
            center : [138.6000, -34.9286]
        })
    }

    _polygonClicked = ({ feature }) => {
    console.log('Polygon clicked', feature.geometry.coordinates);
    };

    _onStyleLoad = (map, event) => {
        console.log('map', map, 'event: ', event, this.refs.map)
        var Draw = MapboxDraw;
        console.log(Draw)
        map.addSource('16MAR13-FP-TOMNOD', {
            type: 'vector',
            tiles: ['https://s3.amazonaws.com/tomnod-vector-tiles/16MAR13-FP-TOMNOD/{z}/{x}/{y}']
        })
        map.addLayer({
            'id': '16MAR13-FP-TOMNOD',
            'type': 'line',
            'source': '16MAR13-FP-TOMNOD',
            'source-layer': '16MAR13-FP-TOMNOD',
            'layout': {
                'visibility': 'visible'
            },
            'paint': {},
            'interactive': true
        });
        map.addControl(Draw)
    }

    _onClick = () => {
        this.setState({
            center : [110,23]
        })
    }

    render() {
        return (
        <div className='full'>
            <ReactMapboxGl
                style={this.props.style}
                center={this.state.center}
                zoom={[13]}
                accessToken={this.props.accessToken}
                containerStyle={this.props.containerStyle}
                onStyleLoad={this._onStyleLoad}
                onClick={this._onClick}
                ref='map'>
            </ReactMapboxGl>
        </div>
    );
    }
}

export default DrawMap