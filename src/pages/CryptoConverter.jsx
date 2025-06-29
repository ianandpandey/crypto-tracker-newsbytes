import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeftRight, Loader2 } from "lucide-react";

function CryptoConverter() {
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCoin, setFromCoin] = useState("bitcoin");
  const [toCoin, setToCoin] = useState("ethereum");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coinsLoading, setCoinsLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/list"
        );
        setCoins(res.data);
        setCoinsLoading(false);
      } catch (error) {
        console.error("Error fetching coins:", error);
        setCoinsLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const handleConvert = async () => {
    if (!amount || amount <= 0) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price`,
        {
          params: {
            ids: `${fromCoin},${toCoin}`,
            vs_currencies: "usd",
          },
        }
      );

      const fromPrice = res.data[fromCoin]?.usd;
      const toPrice = res.data[toCoin]?.usd;

      if (fromPrice && toPrice) {
        const converted = (amount * fromPrice) / toPrice;
        setResult(converted);
      }
    } catch (error) {
      console.error("Conversion error:", error);
    } finally {
      setLoading(false);
    }
  };

  const swapCoins = () => {
    const temp = fromCoin;
    setFromCoin(toCoin);
    setToCoin(temp);
    setResult(null);
  };

  const getSelectedCoinName = (coinId) => {
    const coin = coins.find((c) => c.id === coinId);
    return coin ? coin.name : coinId;
  };

  if (coinsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading cryptocurrencies...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-dark text-gray-900 mb-2">
            Cryptocurrency Converter
          </h1>
          <p className="text-gray-600">
            Convert between different cryptocurrencies instantly
          </p>
        </div>

        {/* Converter Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Amount Input */}
          <div className="p-6 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 text-2xl font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Enter amount"
              min="0"
              step="any"
            />
          </div>

          {/* From Currency */}
          <div className="p-6 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <select
              value={fromCoin}
              onChange={(e) => setFromCoin(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            >
              {coins.slice(0, 100).map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol?.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center py-4 bg-gray-50">
            <button
              onClick={swapCoins}
              className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
              title="Swap currencies"
            >
              <ArrowLeftRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* To Currency */}
          <div className="p-6 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <select
              value={toCoin}
              onChange={(e) => setToCoin(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            >
              {coins.slice(0, 100).map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol?.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Convert Button */}
          <div className="p-6">
            <button
              onClick={handleConvert}
              disabled={loading || !amount || amount <= 0}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Converting...</span>
                </div>
              ) : (
                "Convert"
              )}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">
                Conversion Result
              </div>
              <div className="text-2xl font-light text-gray-900 mb-1">
                <span className="font-medium">
                  {parseFloat(amount).toLocaleString()}
                </span>
                <span className="text-gray-500 mx-2">
                  {getSelectedCoinName(fromCoin)}
                </span>
                <span className="text-gray-400">=</span>
              </div>
              <div className="text-3xl font-medium text-gray-900">
                {result.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 8,
                })}
                <span className="text-xl text-gray-500 ml-2">
                  {getSelectedCoinName(toCoin)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Exchange rates are fetched in real-time from CoinGecko API</p>
        </div>
      </div>
    </div>
  );
}

export default CryptoConverter;
