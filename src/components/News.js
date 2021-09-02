import React, { Component } from 'react'
import NewsItems from './NewsItems'

export default class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            isLoading: true,
            page: 1
        }
    }

    nextClick = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=us&page=${this.state.page + 1}&apiKey=0c3e147cb86248599961bd1dd93d83e1`;
        const data = await fetch(url);
        const parsed = await data.json();
        console.log(parsed);
        this.setState({ articles: parsed.articles, isLoading: false, page: this.state.page + 1 });
    }


    previousClick = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=us&page=${this.state.page - 1}&apiKey=0c3e147cb86248599961bd1dd93d83e1`;
        const data = await fetch(url);
        const parsed = await data.json();
        console.log(parsed);
        this.setState({ articles: parsed.articles, isLoading: false, page: this.state.page - 1 });
    }

    render() {
        return (
            <div className="container  overflow-hidden my-4">
                <h1>NewsSpider - Top Headlines</h1>
                <div className="row">

                    {this.state.articles.map((element) => {
                        return <div className="col-md-4 " key={element.url}>
                            <NewsItems title={element.title} description={element.description} image={element.urlToImage} url={element.url} />
                        </div>

                    })}
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.previousClick}> &larr; Previous</button>
                    <button type="button" className="btn btn-primary" onClick={this.nextClick}>Next &rarr;</button>
                </div>

            </div >
        )
    }


    async componentDidMount() {
        const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=0c3e147cb86248599961bd1dd93d83e1";
        const data = await fetch(url);
        const parsed = await data.json();
        console.log(parsed);
        this.setState({ articles: parsed.articles, isLoading: false });

    }
}
