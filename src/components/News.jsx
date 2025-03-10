import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    
    const capitalizeFirstLetter=(string)=>{
     return string.charAt(0).toUpperCase() + string.slice(1)
    }
    
    
    const updateNews = async () =>{
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
      let data = await fetch(url);
      props.setProgress(30);
      let parseData = await data.json();
      props.setProgress(70);
      setArticles(parseData.articles)
      setTotalResults(parseData.totalResults)
      setLoading(false)
      props.setProgress(100);
    }
    
    
    useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
      updateNews();
    },[]);
 

    const handlePrevClick = async() => {
        setPage(page-1);
        updateNews();
    }
    
    const handleNextClick = async() => {
         setPage(page+1);
         updateNews();
        }

    const fetchMoreData = async () => {
      setLoading(true)
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1);
      let data = await fetch(url);
      let parseData = await data.json();
      setArticles(articles.concat(parseData.articles))
      setTotalResults(parseData.totalResults)
      setLoading(false)
    };
    
 
    return (
      <>
       <div className='container my-3' style={{width:"1000px"}}>
         <h1 className='text-center' style={{margin:'90px 0px 40px 0px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          {loading && <Spinner/>}
          <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length !== totalResults}
              loader={loading && <Spinner/>} >
                <div className="container">
                  <div className="row" >
                    { articles.map((element,index)=>{
                     return <div className="col-md-4" key={element.url ? `${element.url}-${index}` : index}>
                        <NewsItem title={element.title?element.title.slice(0,70):""} description={element.description?element.description.slice(0,70):""}
                          imageUrl={element.urlToImage}  newsUrl= {element.url} author={element.author ? element.author.slice(0, 40) : "Unknown"}
                          date={element.publishedAt ? element.publishedAt.slice(0, 70) : "Unknown"}/>
                      </div>
                })}
                </div>
              </div>
          </InfiniteScroll>
          {/* <div className=" d-flex justify-content-between">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}><strong>&lt; Previous</strong></button>
                <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}><strong>Next &gt;</strong></button>
            </div> */}
      </div>
</>
    )
}

News.defaultProps = {
  country : 'in',
  pageSize : 6
}
News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number
}

export default News;