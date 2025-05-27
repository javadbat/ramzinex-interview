import { Outlet } from "react-router"
import './layout.css';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from "react-redux";
import { fetchPairData, fetchPriceData, fetchStatsData } from "../list/marketSlice";
import { useEffect } from "react";

function Layout() {
  //TODO: this is a temporary solution to fetch data on every page load we should create redux own provider but now i have no time for that
  const dispatch = useDispatch<AppDispatch>();
  const { loading, pairs,prices, stats } = useSelector((state: RootState) => state.market);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchPriceData());
      dispatch(fetchPairData());
      dispatch(fetchStatsData());
    }, 20000)
    return () => clearInterval(interval);
  }, [dispatch]);
  const isLoading =  (loading.pairs || loading.prices || loading.stats) && !(pairs && prices && stats);
  return (
    <div id="Layout">
      {
        isLoading? <div className="loading">Loading...</div> : <Outlet />
      }

    </div>
  )
}

export default Layout