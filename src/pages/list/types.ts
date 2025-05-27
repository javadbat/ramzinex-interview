type CurrencySymbol = {
    en: string;
    fa: string;
}

type Currency = {
    id: number;
    symbol: CurrencySymbol;
    precision: number;
}

type TradingChartSettings = {
    ramzinex: string;
    international: string;
    charts: any[]; // You might want to replace 'any' with a more specific type if you know the structure of chart objects
}

export type CurrencyPair = {
    id: number;
    name: {
        fa: string;
        en: string;
    };
    logo: string;
    trading_chart_settings: TradingChartSettings;
    quote_currency: Currency;
    base_currency: Currency;
    slug: string;
    crypto_box: number;
}


export type StatsInfo = {
    open: number,
    close: number,
    highest: number,
    lowest: number,
    baseVolume: number,
    quoteVolume: number,
    changePercent: number
}
export type StatsData = {
    [key: number]: StatsInfo
}

type PriceInfo = {
        "Amount": number,
        "Checksum": string,
        "Date": number,
        "HumanReadableDate": string,
        "PairId": number,
        "Price": number,
        "Type": "sell" | "buy",
    }
export type PriceData = {
    [key: number]: PriceInfo
}
