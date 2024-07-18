import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import { unselectAll } from '../../store/selectedItemsReducer';

const Dashboard = () => {
  const selecledItems = useSelector(
    (state: IRootState) => state.selectedItems.value,
  );
  const dispatch = useDispatch();

  return (
    <div
      className="dashboard"
      style={{
        display: selecledItems.length > 0 ? 'flex' : 'none',
      }}
    >
      <button onClick={() => dispatch(unselectAll())}>Unselect all</button>
      <button>Download</button>
      <div className="selected-items-counter">{selecledItems.length}</div>
    </div>
  );
};

export default Dashboard;
