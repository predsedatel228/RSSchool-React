/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import Api from '../../Api';
import noimage from '../../assets/noimage.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import { removeItem, selectItem } from '../../store/selectedItemsReducer';

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
  const [isSelect, setIsSelect] = useState(false);

  const page = useSelector( (state: IRootState) => state.pageSlice.value);
  const dispatch = useDispatch();
  
  const selectItemHandler = () => {
    if (!isSelect) {
      api.fetchImage(url).then(data => dispatch(selectItem(data)))
    } else {
      dispatch(removeItem(id));
    }
  } 
  const selecledItems = useSelector( (state: IRootState) => state.selectedItems.value);



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

   const findItem = useMemo(() => selecledItems.find((el: { id: number; }) => el.id == id), [id, selecledItems])

  useEffect(() =>{
   if (findItem) {
     setIsSelect(!isSelect);
   } 
   if (isSelect && !findItem) {
    setIsSelect(!isSelect);
   }
  }, [findItem] )

  return (
    <div className='search-item-container'>
      <input type="checkbox" onChange={selectItemHandler} checked={isSelect? true : false}/>
    <div className="search-item" onClick={() =>{
      if (rightTabHandler) {
        navigate({
          pathname: '/elem',
          search: `?frontpage=${page}&details=${id}`,
        });
      } else {
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
    </div>
  );
};

export default SearchItem;
