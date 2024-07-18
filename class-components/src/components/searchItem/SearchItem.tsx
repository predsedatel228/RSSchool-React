import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import Api from '../../Api';
import noimage from '../../assets/noimage.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/store';

interface SearchItemI {
  name: string;
  url: string;
  api: Api;
  setItemUrl: Dispatch<SetStateAction<null | string>>;
  setRightTabHandler: Dispatch<SetStateAction<boolean>>
  rightTabHandler: boolean;
}


export interface StatsI {
  base_stat: number;
  stat: { name: string };
}

const SearchItem = (props: SearchItemI) => {
  const [src, setSrc] = useState('');
  const {rightTabHandler, setRightTabHandler} = props;
  const { name, setItemUrl } = props;
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const { api, url} = props;
  const page = useSelector( (state: IRootState) => state.pageSlice.value);
  const fetchSrc = useCallback(() => {
    api
      .fetchImage(url)
      .then((data) => {
        setSrc(data.sprites.front_default || noimage);
        setId(data.id)
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, [api, url]);

  useEffect(() => fetchSrc(), [fetchSrc]);

  return (
    <div className="search-item" onClick={() =>{
      if (rightTabHandler) {
        navigate({
          pathname: '/elem',
          search: `?frontpage=${page}&details=${id}`,
        });
        console.log('elem')

      } else {
        console.log('main')
        navigate({
          pathname: '/',
          search: `?frontpage=${page}`,
        });
      }
      setRightTabHandler(!rightTabHandler);
      setItemUrl(url);
    } }>
      <h2>{name}</h2>
      <img
        className="search-item-image"
        src={src || noimage}
        alt="pokemon image"
      />
    </div>
  );
};

export default SearchItem;
