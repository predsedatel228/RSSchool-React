import {useCallback, useEffect, useState } from 'react';
import Api from '../Api';
import Stats from '../stats/Stats';
import noimage from '../assets/noimage.png';

interface SearchItemI {
  name: string;
  url: string;
  api: Api;
}

const defaultStats = [
  { base_stat: '-', stat: { name: 'hp' } },
  { base_stat: '-', stat: { name: 'attack' } },
  { base_stat: '-', stat: { name: 'defense' } },
  { base_stat: '-', stat: { name: 'special-attack' } },
  { base_stat: '-', stat: { name: 'special-defense' } },
  { base_stat: '-', stat: { name: 'speed' } },
];

interface StatsI {
  base_stat: number;
  stat: { name: string };
}

const SearchItem = (props: SearchItemI) => {
  const [src, setSrc] = useState('');
  const [stats, setStats] = useState([]);
  const { name } = props;

  const fetchSrc = useCallback(() => {
    const { api, url } = props;

    api
      .fetchImage(url)
      .then((data) => {
        setStats(data.stats || defaultStats);
        setSrc(data.sprites.front_default || noimage);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, [props]);
  
  useEffect(() => fetchSrc(), [fetchSrc]);

  return (
    <div className="search-item">
      <h2>{name}</h2>
      <img
        className="search-item-image"
        src={src || noimage}
        alt="pokemon image"
      />
      <h3>Stats</h3>
      <div>
        {stats.map((el: StatsI, index) => (
          <Stats key={index} name={el.stat.name} value={el.base_stat} />
        ))}
      </div>
    </div>
  );
};

export default SearchItem;
