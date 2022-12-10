import React, { Component } from 'react'
import pic from "../Assets/images/noimage.jpg"
import "../Assets/Style/style.css"

export default class NewsItem extends Component {
  render() {
    return (
      <div className='col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-2'>
       <div className="card" >
  <img src={this.props.pic?this.props.pic:pic} height='200px' class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 className="card-title heading">{this.props.title?this.props.title.slice(0,100)+"...":" "}</h5>
    <p className='card-text text-center ' style={{fontSize:"13px"}}>{this.props.date}</p>
    <p className='card-text source'>{this.props.source}</p>
    <p className='card-text decs'>{this.props.description}</p>
     <a href={this.props.url} class="btn mybtn background text-light " >Read Full Article</a>
  </div>
</div>

      </div>
    )
  }
}
