import { useDispatch, useSelector } from "react-redux";
import './table.css';
import { selectMarketData, setSortBy } from "../marketSlice";
export function Table() {
  const marketData = useSelector(selectMarketData);
   const dispatch = useDispatch();
  return (
    <div className='table'>
      <div className='table-header'>
        <div className='header-item' onClick={()=>dispatch(setSortBy("name"))}>نام</div>
        <div className='header-item' onClick={()=>dispatch(setSortBy("price"))}>آخرین قیمت</div>
      </div>
      <div className='table-content'>
        {
          marketData.map((item) => {
            return (
              <div className='table-row' key={item.id}>
                <div className='table-column'>{item.name.fa}</div>
                <div className='table-column'>{item.price.open} {item.quote_currency.symbol.fa}</div>
              </div>
            )
          })
        }
      </div>
    </div>

  )
}
