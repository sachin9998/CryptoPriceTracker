// import React from 'react'
import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrowIcon from "../../assets/arrow_icon.png";
import { useContext } from "react";
import { CoinContext } from "../../context/CoinContext";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
	const { setCurrency } = useContext(CoinContext);

	const handleCurrency = (e) => {
		switch (e.target.value) {
			case "usd": {
				setCurrency({
					name: "usd",
					symbol: "$",
				});
				break;
			}
			case "inr": {
				setCurrency({
					name: "inr",
					symbol: "₹",
				});
				break;
			}
			case "eur": {
				setCurrency({
					name: "eur",
					symbol: "€",
				});
				break;
			}
			default: {
				setCurrency({
					name: "usd",
					symbol: "$",
				});
				break;
			}
		}
	};

	return (
		<div className="navbar">
			{/* Logo */}
			<Link to={'/'}>
				<img className="logo" src={logo} alt="Cryptopalace Logo" />
			</Link>

			{/* Menubar with links */}
			<ul>
				
				<NavLink to={"/"}>
					<li>Home</li>
				</NavLink>

				<li>Features</li>
				<li>Pricing</li>
				<li>Blog</li>
			</ul>

			{/* Currency Dropdonw Menu */}
			<div className="nav-right">
				<select onChange={handleCurrency}>
					<option value="usd">USD</option>
					<option value="euro">Euro</option>
					<option value="inr">INR</option>
				</select>

				<button type="button">
					Signup <img src={arrowIcon} alt="" />
				</button>
			</div>
		</div>
	);
};

export default Navbar;
