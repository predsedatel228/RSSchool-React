/* eslint-disable react-refresh/only-export-components */
import { ContextType, useCallback, useEffect, useMemo, useState } from 'react';
import '../App.css';
import SearchSection from '../components/searchSection/SearchSection';
import SearchItem from '../components/searchItem/SearchItem';
import loadingImage from '../assets/loading.svg';
import Api from '../Api';
import { Outlet, useOutletContext} from 'react-router-dom';

export interface SearchresultI {
  name: string;
  url: string;
}

const Home = () => {
  const [count, setCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = useMemo(() => new Api(), []);
  const [itemDetailUrl, setItemDetailUrl] = useState<string | null>(null);
  const setLoad = () => {
    setLoading(true);
  };

  const searchValue = useCallback(() => {
    setLoading(true);
    if (
      !localStorage.getItem('searchValue') ||
      localStorage.getItem('searchValue')?.length === 0
    ) {
      setLoading(true);
      api.defaulsSearchResults().then((data) => {
        setCount(data.count);
        setSearchResults(data.results);
        setTimeout(() => setLoading(false), 1000);
        setLoading(false)
      });
    } else {
      api
        .defaulsSearchResults()
        .then((data) => setCount(data.count))
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
        })
        .then(() => setTimeout(() => setLoading(false), 1000));
        
    }
  }, [api, count]);

  useEffect(() => searchValue(), [count, searchValue]);

  return (
    <div>
      <SearchSection api={api} callback={searchValue} setLoading={setLoad} />
      <div className='content-container'>
      {!loading && (
        <section className="search-items" /*onClick={searchItemsClickHandler}*/>
          {searchResults.map((el: SearchresultI, index) => (
            <SearchItem key={index} name={el.name} url={el.url} api={api} setItemUrl={setItemDetailUrl}/>
          ))}
        </section>
      )}
      <Outlet context={{ itemDetailUrl }}/>
      </div>
      {loading && <img src={loadingImage} alt="loading" />}
    </div>
  );
};

export default Home;


export function useUrl() {
  return useOutletContext<ContextType<never>>();
}