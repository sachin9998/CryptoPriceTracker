import { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { json, useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import Loader from "../../components/Loader/Loader";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
	const { coinId } = useParams();
	const [coinData, setCoinData] = useState(null);
	const [historicalData, setHistoricalData] = useState({});
	const { currency } = useContext(CoinContext);

	const fetchCoinData = async () => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				"x-cg-demo-api-key": import.meta.env.VITE_REACT_APP_API_KEY,
			},
		};

		fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
			.then((response) => response.json())
			.then((response) => setCoinData(response))
			.catch((err) => console.error(err));
	};

	const fetchHistoricalData = async () => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				"x-cg-demo-api-key": import.meta.env.VITE_REACT_APP_API_KEY,
			},
		};

		fetch(
			`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7&interval=daily`,
			options,
		)
			.then((response) => response.json())
			.then((response) => setHistoricalData(response))
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		fetchCoinData();
		fetchHistoricalData();
	}, [coinId, currency]);

	if (!coinData || !historicalData) {
		return <Loader />;
	}

	return (
		<div className="coin">
			<div className="coin-name">
				<img src={coinData.image.large} alt={coinData.name} />

				<p>
					<b>
						{coinData.name} {coinData.symbol.toUpperCase()}
					</b>
				</p>
			</div>

			<div className="coin-chart">
				<LineChart historicalData={historicalData} />
			</div>

			<div className="coin-info">
				<ul>
					<li>Crypto Market Rank</li>
					<li>{coinData.market_cap_rank}</li>
				</ul>

				<ul>
					<li>Current Price</li>
					<li>
						{currency.symbol}
						{coinData.market_data.current_price[currency.name].toLocaleString()}
					</li>
				</ul>

				<ul>
					<li>Market Cap</li>
					<li>
						{currency.symbol}{" "}
						{coinData.market_data.market_cap[currency.name].toLocaleString()}
					</li>
				</ul>

				<ul>
					<li>24 Hour High</li>
					<li>
						{currency.symbol}{" "}
						{coinData.market_data.high_24h[currency.name].toLocaleString()}
					</li>
				</ul>
				<ul>
					<li>24 Hour Low</li>
					<li>
						{currency.symbol}{" "}
						{coinData.market_data.low_24h[currency.name].toLocaleString()}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Coin;
