import { Component } from 'react';
import Api from '../Api';

interface SearchSectionProps {
  api: Api;
  callback:() => void;
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
    const {callback} = this.props;
    callback();
  }


}

export default SearchSection;
