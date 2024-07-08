import { Component } from "react";
import Api from "../Api";
import Stats from "../stats/Stats";

interface SearchItemI {
  name: string,
  url: string,
  api: Api,
}

interface StatsI {
  base_stat: number;
  stat: {name: string}
}

class SearchItem extends Component {
  props: SearchItemI;
  src: string;
  constructor(props: SearchItemI) {
    super(props)
    this.props = props;
    this.src = '';
  }
  state = {
    stats: [],
  };

  componentDidMount(): void {
    this.fetchSrc();
  }

  componentDidUpdate(): void {
    this.render();
  }

  render() { 
    const {name} = this.props;
    return <div className="search-item">
      <h2>{name}</h2>
      <img src={this.src} alt="pokemon image" />
      <h3>Stats</h3>
      <div>
      {this.state.stats.map((el: StatsI, index) => <Stats key={index} name={el.stat.name} value={el.base_stat}/>)}
      </div>
    </div>
  }

  fetchSrc() {
     const {api, url} = this.props;
     api.fetchImage(url).then(data =>{
      this.setState({src: data.sprites.front_default})
      this.src = data.sprites.front_default;
      this.setState({stats: data.stats})
     }).then( ()=> this.render()) 
  }
}

export default SearchItem;