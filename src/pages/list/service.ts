import type { CurrencyPair, MarketData } from "./types";


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

export async function  getPriceData():Promise<Map<number,MarketData>>{
  try{
    const res = await fetch('https://publicapi.ramzinex.com/exchange/api/v1.0/exchange/chart/statistics-24');
    const data = await res.json();
    const marketData = new Map<number,MarketData>();
    Object.keys(data.data).map((key)=>{
      marketData.set(Number(key),data.data[key])
    })
    return marketData;
  }catch(e){
    console.error("Error fetching pair data:", e);
  }
  return new Map();
}