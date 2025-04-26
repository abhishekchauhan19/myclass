import React, { Component } from "react";
import NewsItems from "./newsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    category: "business",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = ` ${this.capitalizeFirstLetter(this.props.category)} - NewsTadka`;
  }

  async componentDidMount() {
    this.fetchNews(this.state.page);
  }

  fetchNews = async (pageNumber) => {
    this.setState({ loading: true });

    const { country, category } = this.props;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=bb6229bae28a441683c2f756a432920c&page=${pageNumber}&pageSize=20`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        page: pageNumber,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.setState({ loading: false });
    }
  };

  handlePreviousClick = () => {
    if (this.state.page > 1) {
      this.fetchNews(this.state.page - 1);
    }
  };

  handleNextClick = () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 20)) {
      this.fetchNews(this.state.page + 1);
    }
  };

  render() {
    const { articles, loading, page, totalResults } = this.state;

    return (
      <div className="container my-4">
        <h2 className="text-center">NewsTadka - Top Headlines</h2>

        {loading && <Spinner />}

        <div className="row">
          {!loading &&
            articles.map((element, index) => (
              <div className="col-md-4 my-4" key={element.url || index}>
                <NewsItems
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description
                      ? element.description.slice(0, 88)
                      : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author ={
                    element.author ? element.author : "Unknown"
                  }
                  date={element.publishedAt ? element.publishedAt.slice(0, 10) : ""}
                  source={
                    element.source && element.source.name
                      ? element.source.name
                      : "Unknown"
                  }
                />
              </div>
            ))}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1 || loading}
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 > Math.ceil(totalResults / 20) || loading
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
