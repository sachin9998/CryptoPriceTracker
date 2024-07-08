// import React from 'react'
import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrowIcon from "../../assets/arrow_icon.png";

const Navbar = () => {
	return (
		<div className="navbar">
			{/* Logo */}
			<img src={logo} alt="Cryptopalace Logo" />

			{/* Menu */}
			<ul>
				<li>Home</li>
				<li>Features</li>
				<li>Pricing</li>
				<li>Blog</li>
			</ul>

			{/* Currency Dropdonw Menu */}
			<div className="nav-right">
				<select>
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
