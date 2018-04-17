import React from 'react';
import ReactDOM from 'react-dom';
import {Inspector} from 'react-inspector'
import GeoSuggest from '../src';

class GeoDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      1: [],
      2: []
    }
  }

  updateData = (number, result) => {
    this.setState({
      [number]: result
    })
  }

  render() {
    const inspectorStyle = {
      margin: '20px',
      border: '1px solid #CCC',
      padding: '10px'
    }

    return (
      <div style={{margin: '20px'}}>
        <h1> Single selection:</h1>
        <GeoSuggest onChange={(result) => this.updateData(1, result)}/>
        <div style={inspectorStyle}>
          <h3>Result</h3>
          <Inspector data={this.state[1]}/>
        </div>
        <h1> Multiple selections: </h1>
        <GeoSuggest onChange={(result) => this.updateData(2, result)} multiple={true}/>
        <div style={inspectorStyle}>
          <h3>Result</h3>
          <Inspector data={this.state[2]}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <GeoDemo/>
, document.getElementById('root'));
