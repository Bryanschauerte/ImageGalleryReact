import React from 'react';

const SelectNumToShow = ({_handleChange, options, imagesPerWidth})=>{
  return(<div style={{width:"50%", padding:'1%'}}>
    <label>Show {imagesPerWidth} per line</label>
    <select onChange={(e)=>_handleChange(e)} value={imagesPerWidth}>
      {options.map( (item, index)=>{
        return <option value={item} key={item+index}>{item}</option>
      }) }
    </select>
  </div>)
}

export default SelectNumToShow;
