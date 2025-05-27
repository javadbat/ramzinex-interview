import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { setSearchQuery,  } from '../marketSlice';
import './header.css';
export function Header() {
 const searchQuery =  useSelector((state: RootState) => state.market.searchQuery);
 const dispatch = useDispatch();
  return (
    <div className='header'>
      <div className='search-box'>
        <input type="search" placeholder="جستجوی بازار" value={searchQuery} onChange={e=>dispatch(setSearchQuery(e.target.value))} />
      </div>
    </div>
  )
}
