import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getPairData, getPriceData, getStatsData } from './service';
import type { CurrencyPair, PriceData, StatsData } from './types';
import type { RootState } from '../../store/store';

interface MarketState {
  pairs: CurrencyPair[];
  prices: PriceData;
  stats: StatsData;
  searchQuery: string;
  sortBy: 'name' | 'price';
  sortOrder: 'asc' | 'desc';
  loading: {
    pairs: boolean;
    prices: boolean;
    stats: boolean;
  };
  error: {
    pairs: string | null;
    prices: string | null;
    stats: string | null
  };
}

const initialState: MarketState = {
  pairs: [],
  prices: {},
  stats: {},
  searchQuery: '',
  sortOrder: 'asc',
  sortBy: 'name',
  loading: {
    pairs: false,
    prices: false,
    stats: false,
  },
  error: {
    pairs: null,
    prices: null,
    stats: null,
  },
};

export const fetchPairData = createAsyncThunk(
  'market/fetchPairData',
  async () => {
    const data = await getPairData();
    return data;
  }
);

export const fetchPriceData = createAsyncThunk(
  'market/fetchPriceData',
  async () => {
    const data = await getPriceData();
    return data;
  }
);

export const fetchStatsData = createAsyncThunk(
  'market/fetchStatsData',
  async () => {
    const data = await getStatsData();
    return data;
  }
);

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;

    },
    setSortBy: (state, action) => {
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Pair Data
      .addCase(fetchPairData.pending, (state) => {
        state.loading.pairs = true;
        state.error.pairs = null;
      })
      .addCase(fetchPairData.fulfilled, (state, action) => {
        state.loading.pairs = false;
        state.pairs = action.payload;
      })
      .addCase(fetchPairData.rejected, (state, action) => {
        state.loading.pairs = false;
        state.error.pairs = action.error.message || 'خطا در دریافت اطلاعات شبکه';
      })
      // Price Data
      .addCase(fetchPriceData.pending, (state) => {
        state.loading.prices = true;
        state.error.prices = null;
      })
      .addCase(fetchPriceData.fulfilled, (state, action) => {
        state.loading.prices = false;
        state.prices = action.payload;
      })
      .addCase(fetchPriceData.rejected, (state, action) => {
        state.loading.prices = false;
        state.error.prices = action.error.message || 'خطا در دریافت اطلاعات قیمت';
      })
      // Stats Data
      .addCase(fetchStatsData.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(fetchStatsData.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = action.payload;
      })
      .addCase(fetchStatsData.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats = action.error.message || 'خطا در دریافت اطلاعات قیمت';
      });

  },
});

export const combinedMarketData = createSelector(
  [(state: RootState) => state.market.pairs, (state: RootState) => state.market.stats, (state: RootState) => state.market.prices],
  (pair, stats, prices) => {
    return pair.map(p =>
    ({
      ...p,
      marketInfo: stats[p.id] || { open: 0, high: 0, low: 0, close: 0 },
      price:{
        //TODO: sort prices by date and get the latest price
        buy: Object.values(prices).find(price => price.PairId === p.id && price.Type == "buy"),
        sell:Object.values(prices).find(price => price.PairId === p.id && price.Type == "sell")
      },
    })
    );
  }
);

//filter and sort results base on user states
export const selectMarketData = createSelector(
  [combinedMarketData, (state: RootState) => state.market.searchQuery, (state: RootState) => state.market.sortBy, (state: RootState) => state.market.sortOrder],
  (pair, searchQuery, sortBy, sortOrder) => {
    const filtered = !searchQuery ? pair : pair.filter(p =>
      p.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.fa.includes(searchQuery) ||
      p.quote_currency.symbol.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.quote_currency.symbol.fa.includes(searchQuery)
    );
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'desc') {
        [a, b] = [b, a];
      }
      if (sortBy === "name") {
        if (a.name.fa < b.name.fa) return -1;
        if (a.name.fa > b.name.fa) return 1;
        return 0;
      } else if (sortBy === "price") {
        return a.marketInfo.open - b.marketInfo.open;
      }
      return 0;
    });
    return sorted;
  }
);

export default marketSlice.reducer;
export const { setSearchQuery, setSortBy } = marketSlice.actions;