import { Component } from 'react';
import './App.css';
import SearchSection from './searchSection/SearchSection';
import Api from './Api';
import SearchItem from './searchItem/SearchItem';
import loading from './assets/loading.svg';

export interface SearchresultI {
  name: string;
  url: string;
}

class App extends Component {
  api: Api;
  count: number;
  searchResults: SearchresultI[];
  constructor(api: Api) {
    super(api);
    this.api = new Api();
    this.count = this.state.count;
    this.searchResults = this.state.searchResults;
  }
  state = {
    searchResults: [],
    count: 0,
    value: localStorage.getItem('searchValue'),
    loading: false,
  };
  componentDidMount(): void {
    this.start();
  }
  render() {
    return (
      <div>
        <SearchSection api={this.api} callback={this.searchValue} setLoading={this.setLoading} />
        {!this.state.loading && (
          <section className="search-items">
            {this.state.searchResults.map((el: SearchresultI, index) => (
              <SearchItem
                key={index}
                name={el.name}
                url={el.url}
                api={this.api}
              />
            ))}
          </section>
        )}
        {this.state.loading && <img src={loading} alt="loading" />}
      </div>
    );
  }
  start() {
    this.setState({ loading: true });
    if (
      !localStorage.getItem('searchValue') ||
      localStorage.getItem('searchValue')?.length === 0
    ) {
      this.api.defaulsSearchResults().then((data) => {
        this.state.count = data.count;
        this.setState({ searchResults: data.results });
        setTimeout(() => this.setState({ loading: false }), 1000)
      });
    } else {
      this.searchValue();
    }
  }

  searchValue = () => {
    this.setState({ searchResults: [] });
    this.setState({ loading: true });
    if (localStorage.getItem('searchValue')?.length === 0) {
      this.start();
    } else {
      this.api
        .defaulsSearchResults()
        .then((data) => (this.state.count = data.count))
        .then(() => this.api.fetchAll(this.state.count))
        .then((data) => {
          const searchValue = localStorage
            .getItem('searchValue')
            ?.toLowerCase()
            .trim();
          if (searchValue) {
            this.setState({ searchResults: [] });
            const searchResults: never[] = Array.from(
              data.results.filter((el: SearchresultI) =>
                el.name.includes(searchValue),
              ),
            );
            this.setState({ searchResults: searchResults });
          }
          
        }).then(() => setTimeout(() => this.setState({ loading: false }), 1000));
    }
  };

  setLoading = () => {
    this.setState({ loading: true });
    console.log(this.state.loading);
  }
}

export default App;
