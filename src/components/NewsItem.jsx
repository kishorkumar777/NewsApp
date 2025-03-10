import React from 'react'

const NewsItem = (props) => {
      let {title , description,imageUrl,newsUrl,author,date} = props;
    return (
      <div >
           <div className="card my-3" style={{width: "18rem" ,height: "460px"}}>
              <img src={!imageUrl?"https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=717/https://s3.cointelegraph.com/uploads/2025-02/0195361e-bd52-774e-8c57-85eda157fe2f":imageUrl} style={{height: "150px"}} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className='text-muted'>By {!author ? "Unknown": author} on {new Date(date).toGMTString()}...</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
           
      </div>
    )
}

export default NewsItem;