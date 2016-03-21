var React = require('react');
var ReactDOM = require('react-dom');
var MessageBoard = require('../components/MessageBoard.js');


ReactDOM.render(<MessageBoard  getUrl="/get" postUrl="/post" title="留言板"/>,
	document.getElementById('container')
)