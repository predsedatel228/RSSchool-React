/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import '../App.css';
import SearchSection from '../components/searchSection/SearchSection';
import SearchItem from '../components/searchItem/SearchItem';
import loadingImage from '../assets/loading.svg';
import Api from '../Api';
import { Outlet, useOutletContext } from 'react-router-dom';

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
  const [rightTabHandler, setRightTabHandler] = useState(true);
  const setLoad = () => {
    setLoading(true);
  };

  const [offcet, setOffcet] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [defaultResults, setDefaultResults] = useState(true);
  const [notDefaultSearchResults, setNotDefaultSearchResults] = useState([]);

  const moveRightSearchResults = () => {
    console.log(start, 'start', end, 'end',)
     let currStart = start;
     let currEnd = end;
     const currSearchResults: SetStateAction<never[]> = [];
     if (searchResults.length - currEnd >= 20) {
      currStart+=20;
      currEnd = currEnd + 20;
     } else {
      currStart = currEnd;
      currEnd = searchResults.length;
     }
     for (let i = currStart; i< currEnd; i++) {
      currSearchResults[i] = searchResults[i];
     }
     setNotDefaultSearchResults(currSearchResults);
     setEnd(currEnd);
     setStart(currStart)
  };


  const moveLeftSearchResults = () => {
    console.log(start, 'start', end, 'end')
     const currStart = start - 20;
     const currEnd = start;
     const currSearchResults: SetStateAction<never[]> = [];
     for (let i = currStart; i< currEnd; i++) {
      currSearchResults[i] = searchResults[i];
     }
     setNotDefaultSearchResults(currSearchResults);
     setEnd(currEnd);
     setStart(currStart)
  };

  const searchValue = useCallback(() => {
    setStart(0);
    setEnd(0);
    setLoading(true);
    if (
      !localStorage.getItem('searchValue') ||
      localStorage.getItem('searchValue')?.length === 0
    ) {
      setDefaultResults(true);
      setLoading(true);
      api.defaulsSearchResults(offcet).then((data) => {
        setCount(data.count);
        setSearchResults(data.results);
        setTimeout(() => setLoading(false), 1000);
        setLoading(false);
        console.log(searchResults.length);
      });
    } else {
      setDefaultResults(false);
      api
        .defaulsSearchResults(0)
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
            if (searchResults.length <= 20) {
              setNotDefaultSearchResults(searchResults);
              setEnd(searchResults.length)
            } else {
              const currNotDefaultSearchResults:SetStateAction<never[]> = [];
              for (let i = 0; i < 20; i++) {
                currNotDefaultSearchResults.push(searchResults[i]);
              }
              setEnd(20);
              setNotDefaultSearchResults(currNotDefaultSearchResults)
            }
            console.log('searchresults.length ',searchResults.length);
          }
        })
        .then(() => setTimeout(() => setLoading(false), 1000));
    }
  }, [api, count, offcet]);

  useEffect(() => searchValue(), [searchValue]);
  return (
    <div>
      <SearchSection api={api} callback={searchValue} setLoading={setLoad} />
      <div className="content-container">
        {loading && <img src={loadingImage} alt="loading" />}
        {!loading && (
          <div>
            <section className="search-items">
              {defaultResults &&
                searchResults.map((el: SearchresultI, index) => (
                  <SearchItem
                    key={index}
                    name={el.name}
                    url={el.url}
                    api={api}
                    rightTabHandler={rightTabHandler}
                    setRightTabHandler={setRightTabHandler}
                    setItemUrl={setItemDetailUrl}
                  />
                ))}
              {!defaultResults &&
                notDefaultSearchResults.map((el: SearchresultI, index) => (
                  <SearchItem
                    key={index}
                    name={el.name}
                    url={el.url}
                    api={api}
                    rightTabHandler={rightTabHandler}
                    setRightTabHandler={setRightTabHandler}
                    setItemUrl={setItemDetailUrl}
                  />
                ))}
            </section>
            {defaultResults && (
              <div>
                <button
                  onClick={() => setOffcet(offcet - 20)}
                  disabled={offcet === 0 ? true : false}
                >
                  Prev
                </button>
                <button
                  onClick={() => setOffcet(offcet + 20)}
                  disabled={offcet+20> count ? true : false}
                >
                  Next
                </button>
              </div>
            )}
            {!defaultResults && (
              <div>
                <button
                  onClick={moveLeftSearchResults}
                  disabled={start === 0 ? true : false}
                >
                  Prev
                </button>
                <button
                  onClick={moveRightSearchResults}
                  disabled={end>= searchResults.length ? true : false}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        <Outlet
          context={
            [itemDetailUrl, rightTabHandler, setRightTabHandler] satisfies [
              string | null,
              boolean,
              Dispatch<SetStateAction<boolean>>,
            ]
          }
        />
      </div>
    </div>
  );
};

export default Home;

export function useUrl() {
  return useOutletContext<
    [string | null, boolean, Dispatch<SetStateAction<boolean>>]
  >();
}
