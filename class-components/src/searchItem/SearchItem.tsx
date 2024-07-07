import { Component } from "react";
import Api from "../Api";

interface SearchItemI {
  name: string,
  url: string,
  api: Api,
}

class SearchItem extends Component {
  props: SearchItemI;
  constructor(props: SearchItemI) {
    super(props)
    this.props = props;

  }
  state = {
    src: '',
    stats: [],
  };

  componentDidMount(): void {
    this.fetchSrc();
  }

  render() { 
    const {name} = this.props;
    return <div className="item">
      <h2>{name}</h2>
      <img src={this.state.src} alt="pokemon image" />
      <h3>Stats</h3>
      {/* <div>
       <span>{this.state.stats[0].base_stat}</span>
       <span>{this.state.stats[0].base_stat.stat.name}</span>
      </div> */}
    </div>
  }

  fetchSrc() {
     const {api, url} = this.props;
     api.fetchImage(url).then(data =>{
      this.setState({src: data.sprites.front_default})
      this.setState({stats: data.stats})
      console.log(this.state.src)
     } )
  }
}

export default SearchItem;