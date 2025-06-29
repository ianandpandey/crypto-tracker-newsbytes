import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Search } from "lucide-react";

function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h,7d",
        },
      })
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    if (price < 1) return `$${price.toFixed(6)}`;
    if (price < 100) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-dark text-gray-900 mb-2">
            Cryptocurrency Prices
          </h1>
          <p className="text-gray-600">
            Track the latest cryptocurrency prices and market data
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {/* Desktop Table Header */}
          <div className="hidden md:block bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Name</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">24h %</div>
              <div className="col-span-2 text-right">7d %</div>
              <div className="col-span-2 text-right">Market Cap</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {filteredCoins.map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4">
                  {/* Rank */}
                  <div className="col-span-1 flex items-center">
                    <span className="text-gray-500 font-medium">
                      {coin.market_cap_rank}
                    </span>
                  </div>

                  {/* Name & Symbol */}
                  <div className="col-span-3 flex items-center space-x-3">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {coin.name}
                      </div>
                      <div className="text-sm text-gray-500 uppercase">
                        {coin.symbol}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="font-medium text-gray-900">
                      {formatPrice(coin.current_price)}
                    </span>
                  </div>

                  {/* 24h Change */}
                  <div className="col-span-2 flex items-center justify-end">
                    <div className="flex items-center space-x-1">
                      {coin.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`font-medium ${
                          coin.price_change_percentage_24h >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* 7d Change */}
                  <div className="col-span-2 flex items-center justify-end">
                    <div className="flex items-center space-x-1">
                      {coin.price_change_percentage_7d_in_currency >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`font-medium ${
                          coin.price_change_percentage_7d_in_currency >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {coin.price_change_percentage_7d_in_currency?.toFixed(
                          2
                        )}
                        %
                      </span>
                    </div>
                  </div>

                  {/* Market Cap */}
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="text-gray-900 font-medium">
                      {formatMarketCap(coin.market_cap)}
                    </span>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden px-4 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-500 text-sm font-medium w-6">
                        {coin.market_cap_rank}
                      </span>
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {coin.name}
                        </div>
                        <div className="text-sm text-gray-500 uppercase">
                          {coin.symbol}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {formatPrice(coin.current_price)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatMarketCap(coin.market_cap)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      {coin.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          coin.price_change_percentage_24h >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        24h: {coin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {coin.price_change_percentage_7d_in_currency >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          coin.price_change_percentage_7d_in_currency >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        7d:{" "}
                        {coin.price_change_percentage_7d_in_currency?.toFixed(
                          2
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {filteredCoins.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No cryptocurrencies found matching "{searchTerm}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
