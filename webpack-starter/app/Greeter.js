// Greeter.js

// ES6
import React, {Component} from 'react';
import config from './config.json';
import styles from './Greeter.css'; // 导入 CSS


//var config = require('./config.json');
/*
module.exports = function(){
	var greeter = document.createElement('div');
	greeter.textContent = config.greetText;
	return greeter;
};*/

class Greeter extends Component {
	render() {
		return (
			<div className={styles.root}>
			  {config.greetText}
			</div>
		);
	}
}

export default Greeter;
