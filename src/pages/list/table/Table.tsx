import { useDispatch, useSelector } from "react-redux";
import './table.css';
import { selectMarketData, setSortBy } from "../marketSlice";
import { Link } from "react-router";
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
              <Link className='table-row' key={item.id} to={"/" + item.slug}>
                <div className='table-column'>{item.name.fa}</div>
                <div className='table-column'>{item.marketInfo.open} {item.quote_currency.symbol.fa}</div>
              </Link>
            )
          })
        }
      </div>
    </div>

  )
}
