import React, { Component } from 'react';
import Montage from './Montage';

import orderBy from 'lodash/orderBy';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { // global state
      textureToggle: false,
      colorToggle: false,
      printToggle: false,
      writeToggle: false,
      waterToggle: false,
      sortToggle: null,
      data: null
    };

    this.handleTexture = this.handleTexture.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
    this.handleWrite = this.handleWrite.bind(this);
    this.handleWater = this.handleWater.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.assignCoords = this.assignCoords.bind(this);
  }

  handleTexture() {
    this.setState(state => ({
      textureToggle: !state.textureToggle
    }));
  }

  handleColor() {
    this.setState(state => ({
      colorToggle: !state.colorToggle
    }));
  }

  handlePrint() {
    this.setState(state => ({
      printToggle: !state.printToggle
    }));
  }

  handleWrite() {
    this.setState(state => ({
      writeToggle: !state.writeToggle
    }));
  }

  handleWater() {
    this.setState(state => ({
      waterToggle: !state.waterToggle
    }));
  }

  handleSort() {
    this.setState(state => ({
      sortToggle: !state.sortToggle
    }));
  }

  getData() {
    fetch('http://localhost:8888/papers.json')
      .then(response => response.json())
      .then(data => this.setState(state => ({
        data: this.assignCoords(data)
      })));
  }

  assignCoords(data) { //placeholder for now
    return data;
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    // conditional prevents infinite loop from render to cDU
    if (prevState.sortToggle !== this.state.sortToggle) {
      this.setState(state => ({
        data: this.assignCoords(this.state.data) //process w no re-fetch
      }))
    }
  }

  render() {
    const textureStyle = {
      backgroundColor: this.state.textureToggle ? 'white' : 'hsl(0, 0%, 15%)',
      color: this.state.textureToggle ? 'black' : 'hsl(0, 0%, 45%)',
    };
    const colorStyle = {
      backgroundColor: this.state.colorToggle ? 'white' : 'hsl(0, 0%, 15%)',
      color: this.state.colorToggle ? 'black' : 'hsl(0, 0%, 45%)',
    };
    const printStyle = {
      backgroundColor: this.state.printToggle ? 'white' : 'hsl(0, 0%, 15%)',
      color: this.state.printToggle ? 'black' : 'hsl(0, 0%, 45%)',
    };
    const writeStyle = {
      backgroundColor: this.state.writeToggle ? 'white' : 'hsl(0, 0%, 15%)',
      color: this.state.writeToggle ? 'black' : 'hsl(0, 0%, 45%)',
    };
    const waterStyle = {
      backgroundColor: this.state.waterToggle ? 'white' : 'hsl(0, 0%, 15%)',
      color: this.state.waterToggle ? 'black' : 'hsl(0, 0%, 45%)',
    };
    const sortStyle = {
      backgroundColor: this.state.sortToggle ? 'white' : 'hsl(0, 0%, 15%)',
      color: this.state.sortToggle ? 'black' : 'hsl(0, 0%, 45%)',
    };

    return (
      <div className='app'>
        <div className='field'>
          <Montage
            data={this.state.data}
            textureToggle={this.state.textureToggle}
            colorToggle={this.state.colorToggle}
            printToggle={this.state.printToggle}
            writeToggle={this.state.writeToggle}
            waterToggle={this.state.waterToggle}
          />
        </div>
        <div className='panel'>
          <div className='buttonStrip'>
            <button onClick={this.handleTexture} style={textureStyle}>FORMATION</button>
            <button onClick={this.handleColor} style={colorStyle}>TRADITION</button>
            <button onClick={this.handlePrint} style={printStyle}>PRINTING</button>
            <button onClick={this.handleWrite} style={writeStyle}>WRITING</button>
            <button onClick={this.handleWater} style={waterStyle}>WATERMARK</button>
            <button onClick={this.handleSort} style={sortStyle}>SORT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
