import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from './Spinner'
export default class News extends Component {
    constructor() {
        super()
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0

        }
    }
    async getData() {
        try {
            this.setState({ page: 1 })
            if (this.props.search != "none") {
                var rawdata = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&language=en&pageSize=${this.props.pageSize}&page=${this.state.page}&apiKey=87ef8d01b70d427e8c9c001ef9b2afdc`)
            }


            else {
                var rawdata = await fetch(`https://newsapi.org/v2/everything?q=${this.props.search}&language=en&pageSize=${this.props.pageSize}&page=${this.state.page}&apiKey=87ef8d01b70d427e8c9c001ef9b2afdc`)
            }
            let result = await rawdata.json()
            this.setState({
                articles: result.articles,
                totalResults: result.totalResults
            })
            console.log(result.totalResults, result.articles);
        }
        catch (error) {
            console.log(error)
            alert("Somethimg Went Wrong")
        }
    }
    fetchMoreData = async () => {
        try {
            this.setState({ page: this.state.page + 1 })
            let rawdata = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&language=en&pageSize=${this.props.pageSize}&page=${this.state.page}&apiKey=87ef8d01b70d427e8c9c001ef9b2afdc`)
            let result = await rawdata.json()
            this.setState({
                articles: this.state.articles.concat(result.articles),

            })

        }
        catch (error) {
            console.log(error)
            alert("Somethimg Went Wrong")
        }
    }
    componentDidMount() {
        this.getData()
    }
    componentDidUpdate(old) {
        if (old.q !== this.props.q  || old.pageSize !== this.props.pageSize || old.search != this.props.search)
            this.getData()
    }
    render() {
        return (
            <>
                <div className='container-fluid'>
                    <h5 className='background text-light text-center p-3 mt-1'>{this.props.q} News Section</h5>
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length < this.state.totalResults}
                        loader={<Spinner />}
                    >


                        <div className='row'>
                            {this.state.articles.map((item, index) => {
                                return <NewsItem
                                    key={index}
                                    title={item.title}
                                    pic={item.urlToImage}
                                    description={item.description}
                                    source={item.source.name}
                                    date={item.publishedAt}
                                    url={item.url}
                                />
                            })}

                        </div>
                    </InfiniteScroll>
                </div>

            </>
        )
    }
}
