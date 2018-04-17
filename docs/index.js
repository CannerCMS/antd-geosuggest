import React from 'react';
import ReactDOM from 'react-dom';
import {Inspector} from 'react-inspector'
import GeoSuggest from '../src';

class GeoDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      1: [],
      2: [],
      3: []
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
        <h1> Single selection with default value:</h1>
        <GeoSuggest
          defaultValue={[{
            key: "Eiflj7DngaPmlrDljJfluILmlrDojorljYDmgJ3mupDot68yMzDlt7c",
            label: "台灣新北市新莊區思源路230巷"
          }]}
          onChange={(result) => this.updateData(3, result)}/>
        <div style={inspectorStyle}>
          <h3>Result</h3>
          <Inspector data={this.state[3]}/>
        </div>
        <h1> Multiple selection with default value:</h1>
        <GeoSuggest
          multiple
          defaultValue={[{
            key: "Eiflj7DngaPmlrDljJfluILmlrDojorljYDmgJ3mupDot68yMzDlt7c",
            label: "台灣新北市新莊區思源路230巷"
          }, {
            key: "ChIJ3-rat5G1bTkRfUnrwltwjwE",
            label: "FS Manasarovar, Sector 2, Mansarovar, Jaipur, Rajasthan"
          }]}
          onChange={(result) => this.updateData(3, result)}/>
        <div style={inspectorStyle}>
          <h3>Result</h3>
          <Inspector data={this.state[3]}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <GeoDemo/>
, document.getElementById('root'));
