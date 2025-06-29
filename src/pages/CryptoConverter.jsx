import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CryptoConverter() {
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCoin, setFromCoin] = useState('bitcoin');
  const [toCoin, setToCoin] = useState('ethereum');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await axios.get('https://api.coingecko.com/api/v3/coins/list');
      setCoins(res.data);
    };
    fetchCoins();
  }, []);

  const handleConvert = async () => {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
        params: {
          ids: `${fromCoin},${toCoin}`,
          vs_currencies: 'usd',
        },
      });

      const fromPrice = res.data[fromCoin].usd;
      const toPrice = res.data[toCoin].usd;

      const converted = (amount * fromPrice) / toPrice;
      setResult(converted);
    } catch (error) {
      console.error('Conversion error:', error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crypto Converter</h1>
      <div className="flex flex-col gap-3">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={fromCoin}
          onChange={(e) => setFromCoin(e.target.value)}
          className="border p-2 rounded"
        >
          {coins.slice(0, 50).map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
        <select
          value={toCoin}
          onChange={(e) => setToCoin(e.target.value)}
          className="border p-2 rounded"
        >
          {coins.slice(0, 50).map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleConvert}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Convert
        </button>

        {result && (
          <p className="text-lg font-semibold">
            Result: {result.toFixed(4)} {toCoin.toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
}

export default CryptoConverter;
