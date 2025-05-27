import './list.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPairData, fetchPriceData } from './marketSlice';
import type { RootState } from '../../store/store';
import type { AppDispatch } from '../../store/store';
import { Table } from './table/Table';
import { Header } from './header/Header';

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.market);
  useEffect(() => {
    dispatch(fetchPriceData());
    dispatch(fetchPairData());
  }, [dispatch]);

  if (loading.pairs || loading.prices) {
    return <div>Loading...</div>;
  }

  return (
    <div className="list">
      <Header/>
      <Table/>
    </div>
  )
}

export default Dashboard