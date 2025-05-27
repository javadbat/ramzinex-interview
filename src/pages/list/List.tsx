import './list.css';
import { use, useEffect, useState } from 'react';
import { Link } from "react-router"
import { getPairData, getPriceData } from './service';
import type { CurrencyPair, MarketData } from './types';
function Dashboard() {
  const [data,setData] = useState<CurrencyPair[]>([]);
  const [marketData,setMarketData] = useState<Map<number,MarketData>>(new Map());
  useEffect(()=>{
    getPriceData().then((data)=>{
      setMarketData(data)
    });
    getPairData().then((data)=>{
      setData(data);
    })
  },[]);

  return (
    <div className="list">
      <div className='header'></div>
      <div className='table'>
        <div className='table-header'>
          <div className='header-item'>نام</div>
          <div className='header-item'>آخرین قیمت</div>
        </div>
        <div className='table-content'>
          {
            data.map((item)=>{
              return(<div className='table-row'>
                <div className='table-column'>{item.name.fa}</div>
                <div className='table-column'>{marketData.get(item.id)?.open} {item.quote_currency.symbol.fa}</div>
              </div>)
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard