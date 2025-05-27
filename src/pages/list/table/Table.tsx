import { useDispatch, useSelector } from "react-redux";
import './table.css';
import { selectMarketData, setSortBy } from "../marketSlice";
import { Link } from "react-router";
import type { RootState } from "../../../store/store";
export function Table() {
  const marketData = useSelector(selectMarketData);
  const sortBy = useSelector((state:RootState) => state.market.sortBy);
  const sortOrder = useSelector((state:RootState) => state.market.sortOrder);
  const sortChar = sortOrder === 'asc' ? '↑' : '↓';
  const dispatch = useDispatch();
  return (
    <div className='table'>
      <div className='table-header'>
        <div className='header-item' onClick={()=>dispatch(setSortBy("name"))}>نام {sortBy === "name"?sortChar:''}</div>
        <div className='header-item' onClick={()=>dispatch(setSortBy("price"))}>آخرین قیمت {sortBy === "price"?sortChar:''}</div>
      </div>
      <div className='table-content'>
        {
          marketData.map((item) => {
            return (
              <Link className='table-row' key={item.id} to={"/" + item.slug}>
                <div className='table-column'>{item.name.fa}</div>
                {/* TODO: we must hide row without price (ask PM)*/}
                <div className='table-column'>{item.price.buy?.Price?`${item.price.buy?.Price} ${item.quote_currency.symbol.fa}`:'ندارد'} </div>
              </Link>
            )
          })
        }
      </div>
    </div>

  )
}
