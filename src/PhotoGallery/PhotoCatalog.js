import React, {Component} from 'react';
import PhotoContainer from './PhotoContainer';
import GallerySelect from './GallerySelect';
import SelectNumToShow from './SelectNumToShow'

class PhotoCatalog extends Component{
  constructor(props){
    super(props);
    this.state={
      width: null,
      height: null,
      galleries:[],
      index: 0,
      hasSelected:null,
      imagesPerWidth: this.props.imagesPerWidth
    }
    this._handleResize = this._handleResize.bind(this);
    this._handlePhotosContainer = this._handlePhotosContainer.bind(this);
    this._handleImage = this._handleImage.bind(this);
    this._sortGalleries = this._sortGalleries.bind(this);
    this._getImages = this._getImages.bind(this);
    this._selectGallery = this._selectGallery.bind(this);
    this._selectNumToShow = this._selectNumToShow.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleSelectedPhoto = this._handleSelectedPhoto.bind(this);

    }

    _handleResize(e){

        this.setState({
          width: isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth,
          height: isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight
         })
    }

    _sortGalleries(){
      const inputArr = this.props.userGalleryInfoArr;
      let galleries = [];
      let state = this.state;
      inputArr.map( item => galleries.push(item.title))
      this.setState({
        ...state, galleries
      })
    }
    _handleClick(indexSelected){
      console.log(indexSelected, "indexSelected")
      let state = this.state;
      this.setState({...state, hasSelected:indexSelected})
    }
    _handleSelectedPhoto(){
      const images = this._getImages();

      const outerStyle = {
        height: this.state.height*.9,
        width: this.state.width*.9,
        margin: this.state.width * .05,
        position:'absolute',
        top: 0,
        left: 0

      }
      const imageStyle = {
        height:'100%',
        width:'100%',
        background: "url("+ images[this.state.hasSelected] +")no-repeat center center",
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        backgroundSize: 'cover'
      }
      return <div>
        <div
          style={
            {position:'absolute',
            top:0,
            left:0,
            opacity: .6,
            height:this.state.height,
            width: this.state.width,
            backgroundColor:'#eee'
            }}></div>

            <div
              key={Math.random()}
              style={outerStyle}
              >
                <img
                  alt={this.state.galleries[this.state.index]+ " image " + this.state.hasSelected}
                  style={imageStyle}/>
            </div>
            <div style={
              {
              position:'absolute',
              top:'5%',
              left:'5%',
              color:'red',
              border:'1px solid red',
              padding:'1%'
            }
            } onClick={()=> this._handleClick(null)}>
              <h1 style={{margin:0}}>{' '}X{' '}</h1>
            </div>
          </div>;
    }

    _handleImage(imageUrl, index){
      const itemW = (this.state.width*.9)/this.state.imagesPerWidth;
      const gridH = this.state.height/this.state.imagesPerWidth;
      const margin = (this.state.width * .1) /(this.state.imagesPerWidth*2);
      const outerStyle = {
        height: gridH,
        width: itemW,
        margin: margin,
        float:'left'

      }

      const imageStyle = {
        height:'100%',
        width:'100%',
        background: "url("+ imageUrl +")no-repeat center center",
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        backgroundSize: 'cover'
      }
      return <div key={Math.random()} style={outerStyle} onClick={()=> this._handleClick(index)}>
                <img
                  alt={this.state.galleries[this.state.index]+ " image " + index}
                  style={imageStyle}/>
            </div>;
    }

    _getImages(){
      let images = [];
      const inputArr = this.props.userGalleryInfoArr;
      inputArr.map(item =>{
        if(item.title === this.state.galleries[this.state.index]){
          images= item.images;
        }
      })
      return images;
    }

    _handlePhotosContainer(){

      const images = this._getImages();

      return <PhotoContainer
                height={this.state.height}
                width={this.state.width}
                >

                {images.map((item, index) => this._handleImage(item, index))}
              </PhotoContainer>


    }

    _selectGallery(e){
      let state= this.state;
      state.index = e.target.value;
      this.setState({state})
    }
    _selectNumToShow(e){
      let state= this.state;
      state.imagesPerWidth = e.target.value;
      this.setState({state})
    }

    componentDidMount(){
      this.setState({
        height:isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight,
        width: isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth
      })
      this._sortGalleries();
      window.addEventListener('resize', this._handleResize);
      this._handleResize();

    }

    componentWillUnmount(){
      window.removeEventListener('resize', this._handleResize)
    }

    render(){

      return(
        <div style={{...this.props.mainContainerStyle, height:this.state.height, width:this.state.width}}>
{this.state.hasSelected != null?<div>{this._handleSelectedPhoto()}</div>:null}
          <div style={this.props.gallerySelectionContainer}>
            <GallerySelect
              stateIndex={this.state.index}
              _handleChange={this._selectGallery}
              options={this.state.galleries}/>
              <SelectNumToShow
                imagesPerWidth={this.state.imagesPerWidth}
                _handleChange={this._selectNumToShow}
                options={this.props.perWidthOptions}/>
            </div>

              {this._handlePhotosContainer()}


          </div>) }
  }



PhotoCatalog.defaultProps = {
  mainContainerStyle:{
    backgroundColor:'#000',
    position: 'relative',
    color:'white'
  },
  gallerySelectionContainer:{
    width:'100%'
  },

  photoContainerStyle:{
    backgroundColor:'#eee',
    position: 'absolute',
    top: 0,
    left: 0,
    textAlign:'center'

  },
  imagesPerWidth: 3,
  perWidthOptions:[1,3,5,10],
  userGalleryInfoArr:
    [
      {
        title:"BABIES EVERYWHERE",
        type:"Gallery Type",
        images:[
          'http://www.mrwallpaper.com/wallpapers/cute-baby-eyes-1920x1080.jpg',
          'http://www.wall321.com/thumbnails/detail/20130405/eyes%20blue%20eyes%20baby%20monochrome%20children%201920x1080%20wallpaper_www.wall321.com_94.jpg',
          'http://www.mrwallpaper.com/wallpapers/cute-baby-eyes-1920x1080.jpg',
          'https://s-media-cache-ak0.pinimg.com/originals/f2/b7/6e/f2b76e5bac1d1fb6f06b0feea13918cb.jpg',
          'http://www.mrwallpaper.com/wallpapers/cute-baby-eyes-1920x1080.jpg'
        ]
      },
      {
        title:"BABIES Here TOO",
        type:"Gallery Type",
        images:[
          'https://s-media-cache-ak0.pinimg.com/originals/f2/b7/6e/f2b76e5bac1d1fb6f06b0feea13918cb.jpg',
          'https://s-media-cache-ak0.pinimg.com/originals/f2/b7/6e/f2b76e5bac1d1fb6f06b0feea13918cb.jpg',
          'https://s-media-cache-ak0.pinimg.com/originals/f2/b7/6e/f2b76e5bac1d1fb6f06b0feea13918cb.jpg'
        ]
      },
      {
        title:"BABIES There",
        type:"Gallery Type",
        images:[
          'http://www.wall321.com/thumbnails/detail/20130405/eyes%20blue%20eyes%20baby%20monochrome%20children%201920x1080%20wallpaper_www.wall321.com_94.jpg',
          'http://www.wall321.com/thumbnails/detail/20130405/eyes%20blue%20eyes%20baby%20monochrome%20children%201920x1080%20wallpaper_www.wall321.com_94.jpg',
          'http://www.wall321.com/thumbnails/detail/20130405/eyes%20blue%20eyes%20baby%20monochrome%20children%201920x1080%20wallpaper_www.wall321.com_94.jpg'
        ]
      },
      {
        title:"BABIES!!!",
        type:"Gallery Type",
        images:[
          'http://www.artsfon.com/pic/201503/1920x1080/artsfon.com-68000.jpg',
          'http://www.artsfon.com/pic/201503/1920x1080/artsfon.com-68000.jpg',
          'http://www.artsfon.com/pic/201503/1920x1080/artsfon.com-68000.jpg'
        ]
      }

    ]

}


export default PhotoCatalog;
