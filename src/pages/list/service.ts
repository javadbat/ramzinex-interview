import type { CurrencyPair, PriceData, StatsData, StatsInfo } from "./types";


export async function  getPairData():Promise<CurrencyPair[]>{
  try{
    const res = await fetch('https://ramzinex.com/exchange/api/v2.0/exchange/pairs/');
    const data = await res.json();
    const pairs:CurrencyPair[] = data.data.pairs;
    return pairs
  }catch(e){
    console.error("Error fetching pair data:", e);
  }
  return []
}

export async function  getPriceData():Promise<PriceData>{
  try{
    const res = await fetch('https://publicapi.ramzinex.com/exchange/api/v1.0/exchange/orderbooks/allTrades');
    const data = await res.json();
    const priceData = data.data;
    return priceData;
  }catch(e){
    console.error("Error fetching pair data:", e);
  }
  return {};
}


export async function  getStatsData():Promise<StatsData>{
  try{
    const res = await fetch('https://publicapi.ramzinex.com/exchange/api/v1.0/exchange/chart/statistics-24');
    const data = await res.json();
    const statsData = data.data;
    return statsData;
  }catch(e){
    console.error("Error fetching stats data:", e);
  }
  return {};
}