import { Outlet } from "react-router"
import './layout.css';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from "react-redux";
import { fetchPairData, fetchPriceData } from "../list/marketSlice";
import { useEffect } from "react";

function Layout() {
  //TODO: this is a temporary solution to fetch data on every page load we should create redux own provider but now i have no time for that
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.market);
  useEffect(() => {
    dispatch(fetchPriceData());
    dispatch(fetchPairData());
  }, [dispatch]);

  return (
    <div id="Layout">
      {
        (loading.pairs || loading.prices)? <div className="loading">Loading...</div> :<Outlet />
      }
      
    </div>
  )
}

export default Layout