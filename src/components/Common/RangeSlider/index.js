/**
 *
 *  Range Slider
 *
 */

import React, { useState } from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls='rc-slider-tooltip'
      overlay={`$${value}`}
      visible={dragging}
      placement='top'
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

function RangeSlider(props){

  const { type, marks, step, defaultValue, max, allowCross, onChange } = props;

  
  const [sliderValue, setSliderValue] = useState(50)
  const [rangeValue, setRangeValue] = useState(defaultValue)

  return (
    <>
      {type === 'slider' ? (
        <Slider
          className='slider'
          dots
          reverse
          allowCross={allowCross}
          step={step}
          defaultValue={defaultValue}
          marks={marks}
          value={sliderValue}
          onChange={setSliderValue}
          onAfterChange={onChange}
        />
      ) : (
        <Range
          className='slider'
          pushable={10}
          allowCross={allowCross}
          min={1}
          max={max}
          step={step}
          defaultValue={defaultValue}
          marks={marks}
          handle={handle}
          tipFormatter={value => `$${value}`}
          value={rangeValue}
          onChange={setRangeValue}
          onAfterChange={onChange}
        />
      )}
    </>
  );
}

RangeSlider.defaultProps = {
  type: 'range',
  allowCross: true
};

export default RangeSlider;
