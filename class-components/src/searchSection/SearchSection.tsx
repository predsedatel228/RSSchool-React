import { Component } from 'react';
import Api from '../Api';

interface SearchSectionProps {
  api: Api;
  callback:() => void;
  setLoading: () => void;
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
        <button type="button" onClick={()=> this.setItem(searchValue)}>Search</button>
        <button type="button" onClick={this.errorButtonHandler}>Error</button>
      </section>
    );
  }

  errorButtonHandler = () => {
    this.setState(() => {
      throw new Error("Synthetic Error");
    });
  };

  setItem(value:string) {
    const {setLoading} = this.props;
    setLoading();
    localStorage.setItem('searchValue', value.toLowerCase().trim());
    const {callback} = this.props;
    callback();
  }


}

export default SearchSection;
