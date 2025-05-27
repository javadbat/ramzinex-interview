import { useSelector } from 'react-redux';
import './detail.css';
import { combinedMarketData } from '../list/marketSlice';
import { useParams } from 'react-router';

export default function Detail() {
  const { slug } = useParams<{ slug: string }>();
  const data = useSelector(combinedMarketData);
  const item = data.find(item => item.slug === slug); // Replace 'some-slug' with actual slug logic
  if (!item) {
    return <div>Item not found</div>;
  }
  return (
    <div id="Detail">
      <div className="detail-header">
        <div className='image-wrapper'>
          <img src={item.logo} alt={item.name.fa} />
        </div>
        <div className='detail-title'>
          <h1>{item.name.fa} ({item.base_currency.symbol.en})</h1>
        </div>
        <div className='detail'>
          <div className='flex flex-row justify-between items-center'>
            <div>نام انگلیسی</div>
            <div>{item.name.en}</div>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <div>قیمت</div>
            <div>{item.marketInfo.open}</div>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <div>تغییرات 24 ساعته</div>
            <div>{item.marketInfo.changePercent}%</div>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <div>حجم معاملاتی</div>
            <div>{item.marketInfo.quoteVolume}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
