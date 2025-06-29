import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 20,
              page: 1,
              sparkline: false,
              price_change_percentage: '24h,7d',
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCrypto();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top Cryptocurrencies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <div key={coin.id} className="p-4 border rounded shadow hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <div>
                <h2 className="font-semibold">{coin.name}</h2>
                <p className="text-sm text-gray-500">{coin.symbol.toUpperCase()}</p>
              </div>
            </div>
            <p className="mt-2">💰 ${coin.current_price.toLocaleString()}</p>
            <p className={`mt-1 ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              24h: {coin.price_change_percentage_24h?.toFixed(2)}%
            </p>
            <p className={`mt-1 ${coin.price_change_percentage_7d_in_currency >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              7d: {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
