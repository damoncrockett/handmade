import React, { Component } from 'react';
import { select } from 'd3-selection';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';

const margin = {top: 40, right: 40, bottom: 40, left: 40};
const rectSide = 13;
const rectPad = 1;
const widthDict = {'Full': rectSide - 1, 'Partial': rectSide - 1 };
const heightDict = {'Full': rectSide * 2, 'Partial': rectSide - 1 };

const colorTable = {
  'Asian':'rgb(102,222,120)',
  'Western':'rgb(39,191,179)',
  'off':'#9f9a86'
};

const patternTable = {
  'off Laid': 'url(#offLaid)',
  'off Wove': 'url(#offWove)',
  'off Unknown': colorTable['off'],
  'Western Laid': 'url(#westernLaid)',
  'Western Wove': 'url(#westernWove)',
  'Western Unknown': colorTable['Western'],
  'Asian Laid': 'url(#asianLaid)',
  'Asian Unknown': colorTable['Asian'],
  'Unknown Laid': 'url(#offLaid)',
  'Unknown Unknown': colorTable['off'],
  'off off': colorTable['off'],
  'Western off': colorTable['Western'],
  'Asian off': colorTable['Asian'],
  'Unknown off': colorTable['off'],
}

class Montage extends Component {
  constructor(props) {
    super(props);
    this.drawMontage = this.drawMontage.bind(this);
    this.setRectAttr = this.setRectAttr.bind(this);
    this.injectPatterns = this.injectPatterns.bind(this);
    this.svgNode = React.createRef();
    this.state = {
      svgH: null,
      svgW: null,
      plotH: null,
      plotW: null
    };
  }

  componentDidMount() {
    this.injectPatterns();
  }

  componentDidUpdate(prevProps, prevState) {
    // conditional prevents infinite loop
    if (prevProps.data !== this.props.data) {
      this.setRectAttr();
    }
    // has to be outside conditional because buttons don't change props.data
    this.drawMontage();
  }

  setRectAttr() {
    const gridW = max(this.props.data.map(d => Number(d.x)));
    const gridH = max(this.props.data.map(d => Number(d.y)));
    const plotW = gridW * (rectSide + rectPad) + rectSide; // no outer pads
    const plotH = gridH * (rectSide + rectPad) + rectSide; // no outer pads

    this.setState(state => ({
      svgW: plotW + margin.left + margin.right,
      svgH: plotH + margin.top + margin.bottom,
      plotW: plotW,
      plotH: plotH,
    }));
  }

  injectPatterns() {
    const svgNode = this.svgNode.current;
    const rectSideMinus = rectSide - 1;
    const strokeWidth = 1;
    const strokeColor = 'black';

    function lineGen (s) {
      return 'M 0 ' + s/2 +
             ' L ' + s + ' 0 ' +
             'M 0 ' + s +
             ' L ' + s + ' ' + s/2 +
             ' M 0 ' + 3*s/2 +
             ' L ' + s + ' ' + s +
             ' M 0 ' + 2*s +
             ' L ' + s + ' ' + 3*s/2
    };

    function sineGen (s) {
      return 'M 0 ' + s/4 +
             ' Q ' + s/2 + ' ' + '0' + ',' + s + ' ' + s/4 +
             'M 0 ' + 3*s/4 +
             ' Q ' + s/2 + ' ' + s/2 + ',' + s + ' ' + 3*s/4 +
             'M 0 ' + 5*s/4 +
             ' Q ' + s/2 + ' ' + s + ',' + s + ' ' + 5*s/4 +
             'M 0 ' + 7*s/4 +
             ' Q ' + s/2 + ' ' + 3*s/2 + ',' + s + ' ' + 7*s/4
    };

    //** offLaid **//

    select(svgNode)
      .selectAll('pattern#offLaid')
      .data([0]) // bc enter selection, prevents appending new 'pattern' on re-render
      .enter()
      .append('pattern')
      .attr('id', 'offLaid')
      .attr('width',1)
      .attr('height',1)
      .attr('x','0')
      .attr('y','0')
      .attr('patternContentUnits','userSpaceOnUse')
      .attr('patternUnits','objectBoundingBox')

    select(svgNode)
      .select('pattern#offLaid')
      .selectAll('rect')
      .data([0])
      .enter()
      .append('rect')
      .attr('width',rectSideMinus)
      .attr('height',rectSide*2)
      .attr('fill',colorTable['off']);

    select(svgNode)
      .select('pattern#offLaid')
      .selectAll('path')
      .data([0])
      .enter()
      .append('path')
      .attr('d',lineGen(rectSideMinus))
      .attr('style','stroke:'+strokeColor+';stroke-width:'+strokeWidth)
      .attr('shape-rendering','crispEdges');

    //** offWove **//

    select(svgNode)
      .selectAll('pattern#offWove')
      .data([0]) // bc enter selection, prevents appending new 'pattern' on re-render
      .enter()
      .append('pattern')
      .attr('id', 'offWove')
      .attr('width',1)
      .attr('height',1)
      .attr('x','0')
      .attr('y','0')
      .attr('patternContentUnits','userSpaceOnUse')
      .attr('patternUnits','objectBoundingBox')

    select(svgNode)
      .select('pattern#offWove')
      .selectAll('rect')
      .data([0])
      .enter()
      .append('rect')
      .attr('width',rectSideMinus)
      .attr('height',rectSide*2)
      .attr('fill',colorTable['off']);

    select(svgNode)
      .select('pattern#offWove')
      .selectAll('path')
      .data([0])
      .enter()
      .append('path')
      .attr('d',sineGen(rectSideMinus))
      .attr('style','stroke:'+strokeColor+';fill:none;stroke-width:'+strokeWidth)
      .attr('shape-rendering','crispEdges');

    //** westernLaid **//

    select(svgNode)
      .selectAll('pattern#westernLaid')
      .data([0]) // bc enter selection, prevents appending new 'pattern' on re-render
      .enter()
      .append('pattern')
      .attr('id', 'westernLaid')
      .attr('width',1)
      .attr('height',1)
      .attr('x','0')
      .attr('y','0')
      .attr('patternContentUnits','userSpaceOnUse')
      .attr('patternUnits','objectBoundingBox')

    select(svgNode)
      .select('pattern#westernLaid')
      .selectAll('rect')
      .data([0])
      .enter()
      .append('rect')
      .attr('width',rectSideMinus)
      .attr('height',rectSide*2)
      .attr('fill',colorTable['Western']);

    select(svgNode)
      .select('pattern#westernLaid')
      .selectAll('path')
      .data([0])
      .enter()
      .append('path')
      .attr('d',lineGen(rectSideMinus))
      .attr('style','stroke:'+strokeColor+';stroke-width:'+strokeWidth)
      .attr('shape-rendering','crispEdges');

    //** westernWove **//
    select(svgNode)
      .selectAll('pattern#westernWove')
      .data([0]) // bc enter selection, prevents appending new 'pattern' on re-render
      .enter()
      .append('pattern')
      .attr('id', 'westernWove')
      .attr('width',1)
      .attr('height',1)
      .attr('x','0')
      .attr('y','0')
      .attr('patternContentUnits','userSpaceOnUse')
      .attr('patternUnits','objectBoundingBox')

    select(svgNode)
      .select('pattern#westernWove')
      .selectAll('rect')
      .data([0])
      .enter()
      .append('rect')
      .attr('width',rectSideMinus)
      .attr('height',rectSide*2)
      .attr('fill',colorTable['Western']);

    select(svgNode)
      .select('pattern#westernWove')
      .selectAll('path')
      .data([0])
      .enter()
      .append('path')
      .attr('d',sineGen(rectSideMinus))
      .attr('style','stroke:'+strokeColor+';fill:none;stroke-width:'+strokeWidth)
      .attr('shape-rendering','crispEdges');

    //** asianLaid **//
    select(svgNode)
      .selectAll('pattern#asianLaid')
      .data([0]) // bc enter selection, prevents appending new 'pattern' on re-render
      .enter()
      .append('pattern')
      .attr('id', 'asianLaid')
      .attr('width',1)
      .attr('height',1)
      .attr('x','0')
      .attr('y','0')
      .attr('patternContentUnits','userSpaceOnUse')
      .attr('patternUnits','objectBoundingBox')

    select(svgNode)
      .select('pattern#asianLaid')
      .selectAll('rect')
      .data([0])
      .enter()
      .append('rect')
      .attr('width',rectSideMinus)
      .attr('height',rectSide*2)
      .attr('fill',colorTable['Asian']);

    select(svgNode)
      .select('pattern#asianLaid')
      .selectAll('path')
      .data([0])
      .enter()
      .append('path')
      .attr('d',lineGen(rectSideMinus))
      .attr('style','stroke:'+strokeColor+';stroke-width:'+strokeWidth)
      .attr('shape-rendering','crispEdges');

  }

  drawMontage() {
    const svgNode = this.svgNode.current;

    function togglesToFill (colorVal,textureVal) {
      let s = colorVal + ' ' + textureVal;
      return patternTable[s];
    }

    select(svgNode)
      .selectAll('g.plotCanvas')
      .data([0]) // bc enter selection, prevents appending new 'g' on re-render
      .enter()
      .append('g')
      .attr('class', 'plotCanvas') // purely semantic
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // This selection is non-empty only the first time
    select(svgNode)
      .select('g.plotCanvas')
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(svgNode)
      .select('g.plotCanvas')
      .selectAll('rect')
      .data(this.props.data)
      .attr('width', d => widthDict[d.format] )
      .attr('height', d => heightDict[d.format] )
      .attr('rx', String(rectSide * .15))
      .attr('ry', String(rectSide * .15))
      .attr('x', d => d.x * (rectSide + rectPad))
      .attr('y', d => d.y * (rectSide + rectPad))
      .attr('fill', d => (
        togglesToFill(
          this.props.colorToggle ? d.tradition : 'off',
          this.props.textureToggle ? d.formation : 'off'
        )
      ))
      .attr('title', d => d.index_number);

      //window.scrollTo( 0, this.state.svgH );
    }

  render() {
    return <svg
             ref={this.svgNode}
             width={this.state.svgW}
             height={this.state.svgH}
           />;
  }
}

export default Montage;
