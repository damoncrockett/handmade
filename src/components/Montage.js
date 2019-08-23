import React, { Component } from 'react';
import { select } from 'd3-selection';
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { togglesToFill } from '../lib/color';

const margin = {top: 40, right: 40, bottom: 40, left: 40};
const baseWidth = 800;
const rectSide = 10;
const rectPad = 1;

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
    const gridW = max(this.props.data.map(d => d.x));
    const gridH = max(this.props.data.map(d => d.y));
    const plotW = gridW * (rectSide + rectPad) + rectSide; // no outer pads
    const plotH = gridH * (rectSide + rectPad) + rectSide; // no outer pads

    this.setState(state => ({
      svgW: histW + margin.left + margin.right,
      svgH: histH + margin.top + margin.bottom,
      plotW: plotW,
      plotH: plotH,
    }));
  }

  drawHistogram() {
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
      .attr('stroke', 'hsl(0, 0%, 15%)');

    select(svgNode)
      .select('g.plotCanvas')
      .selectAll('rect')
      .data(this.props.data)
      .attr('width', this.state.rectSide)
      .attr('height', this.state.rectSide)
      .attr('rx', String(this.state.rectSide * .15))
      .attr('ry', String(this.state.rectSide * .15))
      .attr('x', d => d.x * (this.state.rectSide + this.state.rectPad))
      .attr('y', d => (
        this.state.plotH -
        d.y * (this.state.rectSide + this.state.rectPad) -
        this.state.rectSide
      ))
      .attr('fill', d => (
        togglesToFill(
          this.props.textureToggle ? d.formation : null,
        )
      ))
      .attr('title', d => d.index_number);

      window.scrollTo( 0, this.state.svgH );
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
