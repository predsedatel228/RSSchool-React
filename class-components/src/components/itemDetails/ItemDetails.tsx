import { useNavigate } from 'react-router-dom';
import { useUrl } from '../../routes/Home';
import Api from '../../Api';
import { useEffect, useState } from 'react';
import noimage from '../../assets/noimage.png';
import loadingImage from '../../assets/loading.svg';
import { StatsI } from '../searchItem/SearchItem';
import Stats from '../stats/Stats';

const defaultStats = [
  { base_stat: '-', stat: { name: 'hp' } },
  { base_stat: '-', stat: { name: 'attack' } },
  { base_stat: '-', stat: { name: 'defense' } },
  { base_stat: '-', stat: { name: 'special-attack' } },
  { base_stat: '-', stat: { name: 'special-defense' } },
  { base_stat: '-', stat: { name: 'speed' } },
];

const ItemDetails = () => {
  const navigate = useNavigate();
  const [itemDetailUrl, rightTabHandler, setRightTabHandler, page] = useUrl();
  const api = new Api();
  const [src, setSrc] = useState(noimage);
  const [stats, setStats] = useState([]);
  const [name, setName] = useState('aaaa');
  const [loading, setLoading] = useState(false);
  const fetchData = () => {
    setLoading(true);
    if (itemDetailUrl) {
      api.fetchImage(itemDetailUrl as string).then((data) => {
        console.log(data);
        setName(data.name || 'no name');
        setSrc(data.sprites.front_default || noimage);
        setStats(data.stats || defaultStats);
        setTimeout(() => setLoading(false), 200);
      });
    }
  };
  // eslint-disable-next-line react-compiler/react-compiler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchData(), [itemDetailUrl]);
  return (
    <section className="item-details">
      {!loading && (
        <div className="item">
          <h2>{name}</h2>
          <img src={src} alt="pokemon image" />
          <h3>Stats</h3>
          <div>
            {stats.map((el: StatsI, index) => (
              <Stats key={index} name={el.stat.name} value={el.base_stat} />
            ))}
          </div>
          <button
            onClick={() => {
              navigate({
                pathname: '/',
                search: `?frontpage=${page}`,
              });
              setRightTabHandler(!rightTabHandler);
            }}
          >
            Close
          </button>
        </div>
      )}

      {loading && <img src={loadingImage} alt="loading" />}
    </section>
  );
};

export default ItemDetails;
