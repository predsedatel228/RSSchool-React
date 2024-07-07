import { Component } from 'react';
import Api from '../Api';

interface SearchSectionProps {
  api: Api;
}

class SearchSection extends Component {
  props: SearchSectionProps;
  constructor(props: SearchSectionProps) {
    super(props)
    this.props = props;
  }
  state = {
    searchValue: localStorage.getItem('searchValue') || '',
  };

  // componentDidMount(): void {
  //   console.log(this.state.searchValue + ' didmount')
  // }

  // componentDidUpdate(): void {
  //   console.log(this.state.searchValue + ' didupdate')
  // }

  render() {
    const { searchValue } = this.state;
    return (
      <section>
        <input type="text" defaultValue={searchValue} onChange={(e)=> this.setState({searchValue: e.target.value})} />
        <button type="button" onClick={()=> this.setItem(searchValue)}>Поиск</button>
      </section>
    );
  }

  setItem(value:string) {
    localStorage.setItem('searchValue', value);
    // this.props.api.searchResults(value);
  }

}

export default SearchSection;
