import { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import Loader from "../../components/Loader/Loader";

const Coin = () => {
	const { coinId } = useParams();
	const [coinData, setCoinData] = useState();
	const { currency } = useContext(CoinContext);

	const fetchCoinData = async () => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				"x-cg-demo-api-key": "CG-3ZPqfj5SfNfuSHmzYZAzgGnv",
			},
		};

		fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
			.then((response) => response.json())
			.then((response) => setCoinData(response))
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		fetchCoinData();
	}, [coinId, currency]);

	if (!coinData) {
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
		</div>
	);
};

export default Coin;
