import React, {Component} from 'react';



class PhotoContainer extends Component{
  render(){
    return(<div style={this.props.style}>

        {this.props.children}
    </div>)
  }
}

PhotoContainer.defaultProps ={
  style:{
    backgroundColor:'#000',
    textAlign:'center'

  }
}

export default PhotoContainer;
