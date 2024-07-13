import { useState } from 'react';
import Api from '../../Api';

interface SearchSectionProps {
  api: Api;
  callback:() => void;
  setLoading: () => void;
}

const SearchSection = (props: SearchSectionProps) => {
   const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '',)

  const errorButtonHandler = () => {
    setSearchValue(() => {throw new Error("Synthetic Error")});
  };

  const setItem = (value:string) => {
    const {setLoading} = props;
    setLoading();
    localStorage.setItem('searchValue', value.toLowerCase().trim());
    const {callback} = props;
    callback();
  }
    return (
      <section>
        <input type="text" defaultValue={searchValue} onChange={(e)=> setSearchValue(e.target.value)} />
        <button type="button" onClick={()=> setItem(searchValue)}>Search</button>
        <button type="button" onClick={errorButtonHandler}>Error</button>
      </section>
    );

}

export default SearchSection;