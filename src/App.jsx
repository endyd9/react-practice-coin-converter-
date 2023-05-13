import Button from "./Button.jsx";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [yourCoin, setYourCoin] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const myMoney = (event) => {
    setMoney(event.target.value);
  };

  const USDtoCoin = () => {
    const price = parseInt(
      document
        .querySelector("select")
        .value.match(/[0-9]./g)
        .join("")
    );

    setYourCoin(money / price);
  };
  return (
    <div>
      <h1>The Conis! {coins.length}</h1>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <hr />
          <br />
          your money : <input onChange={myMoney} type="number" /> USD
          <br />
          &nbsp; &nbsp; &nbsp;
          <button onClick={USDtoCoin}>will be</button>
          &nbsp; &nbsp; &nbsp;
          <input type="number" value={yourCoin} readOnly />
        </div>
      )}
    </div>
  );
}

export default App;
