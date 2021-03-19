import React, { Component } from 'react';
import Montage from './Montage';

import orderBy from 'lodash/orderBy';
import fill from 'lodash/fill';
import range from 'lodash/range';
import times from 'lodash/times';
import constant from 'lodash/constant';
import flatten from 'lodash/flatten';

const gridPos = 45;
const lengthDict = {
  'Full':2,
  'Partial':1
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { // global state
      textureToggle: false,
      colorToggle: false,
      printToggle: false,
      writeToggle: false,
      waterToggle: false,
      sortToggle: true,
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
    //fetch('http://localhost:8888/papers.json')
    fetch('papers.json')
      .then(response => response.json())
      .then(data => this.setState(state => ({
        data: this.assignCoords(data)
      })));
  }

  assignCoords(data) {
    //let sortedData = (this.state.sortToggle ? orderBy(data,'id') : (Math.random() >= 0.5 ? orderBy(data,'tradition','desc') : (Math.random() >= 0.5 ? orderBy(data,'formation') : orderBy(data,'format'))));
    let sortedData = (this.state.sortToggle ? orderBy(data,'id') : orderBy(data,['formation','tradition']));
    // basically implementing _gridcoords() here
    //let n = sortedData.length;
    //let ncols = Math.round( Math.sqrt(n) );
    //let nrows = Math.ceil( n / ncols );
    //let x = flatten(times(nrows, constant(range(ncols))));
    //let y = flatten(range(nrows).map(d => times(ncols, constant(d))));

    //sortedData.forEach((item, idx) => {
    //    item.x = x[idx];
    //    item.y = y[idx];
    //  });

    let gridSum = 0;
    let lastLength = null;
    let colNum = 0;
    let yPos = 0;

    for (let i = 0; i < sortedData.length; i++) {
      if (gridSum > gridPos) {
        gridSum = 0;
        colNum++;
        yPos = 0;
        lastLength = null;
      }

      let yDiff = (lastLength ? lastLength : 0);
      let itemLength = lengthDict[sortedData[i].format];
      gridSum += itemLength;
      lastLength = itemLength;

      yPos += yDiff;
      sortedData[i].y = yPos;
      sortedData[i].x = colNum;
    }

    return sortedData
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
    const bkgd = '#e8e3cd';
    const stroke = '#9f9a86';
    const textureStyle = {
      backgroundColor: this.state.textureToggle ? 'white' : bkgd,
      color: this.state.textureToggle ? 'black' : stroke,
    };
    const colorStyle = {
      backgroundColor: this.state.colorToggle ? 'white' : bkgd,
      color: this.state.colorToggle ? 'black' : stroke,
    };
    const printStyle = {
      backgroundColor: this.state.printToggle ? 'white' : bkgd,
      color: this.state.printToggle ? 'black' : stroke,
    };
    const writeStyle = {
      backgroundColor: this.state.writeToggle ? 'white' : bkgd,
      color: this.state.writeToggle ? 'black' : stroke,
    };
    const waterStyle = {
      backgroundColor: this.state.waterToggle ? 'white' : bkgd,
      color: this.state.waterToggle ? 'black' : stroke,
    };
    const sortStyle = {
      backgroundColor: this.state.sortToggle ? 'white' : bkgd,
      color: this.state.sortToggle ? 'black' : stroke,
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
            <button onClick={this.handleWater} style={waterStyle}>WATERMARK</button>
            <button onClick={this.handlePrint} style={printStyle}>PRINTING</button>
            <button onClick={this.handleWrite} style={writeStyle}>WRITING</button>
            <button onClick={this.handleSort} style={sortStyle}>INDEXSORT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
