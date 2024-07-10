import {useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import SearchSection from './searchSection/SearchSection';
import Api from './Api';
import SearchItem from './searchItem/SearchItem';
import loadingImage from './assets/loading.svg';

export interface SearchresultI {
  name: string;
  url: string;
}

const App = () => {
  const [count, setCount ] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = useMemo(() => new Api(), []);


  const setLoad = () => {
    setLoading(true);
  }

  const searchValue = useCallback(() => {
    setLoading(true);
    if (!localStorage.getItem('searchValue') || localStorage.getItem('searchValue')?.length === 0) {
      setLoading(true);
      api.defaulsSearchResults().then((data) => {
        setCount(data.count);
         setSearchResults(data.results);
         setTimeout(() => setLoading(false), 1000)
       });
    } else {
      api.defaulsSearchResults()
        .then((data) => (setCount(data.count)))
        .then(() => api.fetchAll(count))
        .then((data) => {
          const searchValue = localStorage
            .getItem('searchValue')
            ?.toLowerCase()
            .trim();
          if (searchValue) {
            setSearchResults([]);
            const searchResults: never[] = Array.from(
              data.results.filter((el: SearchresultI) =>
                el.name.includes(searchValue),
              ),
            );
            setSearchResults(searchResults);
          }
          
        }).then(() => setTimeout(() => setLoading(false), 1000));
    }
  }, [api, count]);

  useEffect(() => searchValue(), [count, searchValue])

  return (
    <div>
      <SearchSection api={api} callback={searchValue} setLoading={setLoad} />
      {!loading && (
        <section className="search-items">
          {searchResults.map((el: SearchresultI, index) => (
            <SearchItem
              key={index}
              name={el.name}
              url={el.url}
              api={api}
            />
          ))}
        </section>
      )}
      {loading && <img src={loadingImage} alt="loading" />}
    </div>
  );
}

export default App;