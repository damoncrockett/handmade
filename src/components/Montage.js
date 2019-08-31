import React, { Component } from 'react';
import { select } from 'd3-selection';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { togglesToFill } from '../lib/color';

const margin = {top: 40, right: 40, bottom: 40, left: 40};
const rectSide = 13;
const rectPad = 1;
const widthDict = {'Full': rectSide - 1, 'Partial': rectSide - 1 };
const heightDict = {'Full': rectSide * 2, 'Partial': rectSide - 1 };

class Montage extends Component {
  constructor(props) {
    super(props);
    this.drawMontage = this.drawMontage.bind(this);
    this.setRectAttr = this.setRectAttr.bind(this);
    this.svgNode = React.createRef();
    this.state = {
      svgH: null,
      svgW: null,
      plotH: null,
      plotW: null
    };
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

  drawMontage() {
    const svgNode = this.svgNode.current;

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
      .attr('y', d => (d.y * (rectSide + rectPad)))
      .attr('fill', d => (
        togglesToFill(
          this.props.colorToggle ? d.tradition : null
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
