import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from '../store/store';
import DataCard from '../components/DataCard';
import { ISavedData } from '../types';

const Main = () => {
  const data = useSelector((state: IRootState) => state.dataSlice);
  return (
    <div className="forms-container">
      <div className='link-container'>
        <Link to="/form">Uncontolled form</Link>
        <Link to="/react-hook-form">React hook form</Link>
      </div>

      <div className="forms">
        {data.map((el: ISavedData, index: number) => (
          <DataCard data={el} key={index}/>
        ))}
      </div>
    </div>
  );
};

export default Main;
