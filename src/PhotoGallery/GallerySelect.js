import React from 'react';

const GallerySelect = ({_handleChange, options, stateIndex})=>{
  return(<div style={{width:"50%", padding:'1%'}}>
    <label>Select a Gallery</label>
    <select onChange={(e)=>_handleChange(e)} value={stateIndex}>
      {options.map( (item, index)=>{
        return <option value={index} key={item+index}>{item}</option>
      }) }
    </select>
  </div>)
}

export default GallerySelect;
