import { Component } from 'react';
import './App.css';
import SearchSection from './searchSection/SearchSection';
import Api from './Api';
import SearchItem from './searchItem/SearchItem';

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
  };
  componentDidMount(): void {
    this.start();
  }
  componentDidUpdate(): void {
    this.render();
  }
  render() {
    return (
      <div>
        <SearchSection api={this.api} callback={this.try}/>
        <section className='search-items'>
          {this.state.searchResults.map((el: SearchresultI, index) => (
            <SearchItem
              key={index}
              name={el.name}
              url={el.url}
              api={this.api}
            />
          ))}
        </section>
      </div>
    );
  }
  start() {
    if (
      !localStorage.getItem('searchValue') ||
      localStorage.getItem('searchValue')?.length === 0
    ) {
      this.api.defaulsSearchResults().then((data) => {
        this.state.count = data.count;
        this.setState({ searchResults: data.results });
        this.render();
      });
    } else {
      this.searchValue();
    }
  }

  searchValue() {
    this.api.defaulsSearchResults()
    .then((data) => this.state.count = data.count)
    .then(() => this.api.fetchAll(this.state.count))
    .then(data => {
      const searchValue = localStorage.getItem('searchValue')?.toLowerCase().trim(); 
      if (searchValue) {
        const searchResults: never[] = Array.from(data.results.filter((el: SearchresultI) => el.name.includes(searchValue)));
        this.setState({ searchResults: searchResults});
        // this.state.searchResults = searchResults;
        console.log(searchResults, 'searchResults');
        console.log(this.state.searchResults)
        // this.render();
      }

    })
  }

  try = () => {
    this.searchValue()
  }

}

export default App;
