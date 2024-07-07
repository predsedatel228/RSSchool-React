import { Component } from 'react';
import './App.css';
import SearchSection from './searchSection/SearchSection';
import Api from './Api';
import SearchItem from './searchItem/SearchItem';

interface SearchresultI {
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
        <SearchSection api={this.api} />
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
      localStorage.getItem('searchResults')?.length === 0
    ) {
      this.api.defaulsSearchResults().then((data) => {
        this.state.count = data.count;
        this.state.searchResults = data.results;
        this.setState({ searchResult: data.results });
        console.log(this.state.searchResults);
        this.render();
      });
    }
  }
}

export default App;

// const searchResults: { name: string; src: string; }[] = [];
// this.api.defaulsSearchResults()
// .then((data)=>{
//   console.log('datra')
//   this.state.count = data.count;
//   data.results.map((el:SearchresultI)  => {
//     const searchSrc = fetch(el.url)
//       .then(response => response.json())
//       .catch((err) => {
//         console.error(err);
//       })
//       .then(data => {
//         return data.sprites.front_default;
//       }).then(searchSrc => {
//         const searchResult = {
//           name: el.name,
//           src: searchSrc
//         }
//         this.setState({searchResult: this.state.searchResults.push(searchResult)})
//         searchResults.push(searchResult)
//         this.setState({searchResults: searchResults})
//         // console.log(searchResults);
//       })

//     return searchSrc;

//   })
//   // this.searchResults = data.results;
//   this.setState({searchResults: searchResults})
//   console.log(this.state.count, this.state.searchResults, 'aaa')
// } )
