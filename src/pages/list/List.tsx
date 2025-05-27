import './list.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPairData, fetchPriceData } from './marketSlice';
import type { RootState } from '../../store/store';

import { Table } from './table/Table';
import { Header } from './header/Header';

function Dashboard() {

  return (
    <div className="list">
      <Header/>
      <Table/>
    </div>
  )
}

export default Dashboard