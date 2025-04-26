import React, { Component } from 'react'

export default class NewsItems extends Component {

  render() {
    let {title,description,imageUrl,newsUrl,author,date,source } = this.props
    console.log(imageUrl);
    return (
      <div className=''>   
        <div className="card"> 
  <img src={!imageUrl?"/chef.webp":imageUrl} className="card-img-top" alt=""/>
  <div className="card-body">
  <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger"style={{left:'90%',zIndex:'1'}}>
    {source}
  </span>
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className='card-text'><small className="text-muted">By {author}on {date} 3min ago</small></p>
    <a href={newsUrl} target='_blank' className='btn btn-sm btn-dark'>Read more</a>
  </div>  
</div>
      </div>
    )
  }
}  