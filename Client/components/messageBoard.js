var React = require('react');
var MessageList = require('../components/messageList.js');
var MessageForm = require('../components/messageForm.js');

var MessageBoard = React.createClass({
	getInitialState: function() {
		return {
			data: [{
				name: '王宁',
				message: 'Hello!'
			}, {
				name: '哈哈',
				message: '你好！'
			}]
		};
	},
	ajax: function(type, url, async, data, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open(type, url, async);
		console.log(type, url, async, data);
		if (type == 'post') {
			xhr.setRequestHeader('Content-Type', 'application/json');
		}
		xhr.onreadystatechange = function() {
			console.log('readyState', xhr.readyState);
			if (xhr.readyState == 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					console.log('responseText', xhr.responseText);
					var res = eval('(' + xhr.responseText + ')');
					cb(res);
				}
			}
		};
		xhr.send(data);
	},
	componentDidMount: function() {
		var that = this;
		this.ajax('get', this.props.getUrl, true, null, function(res) {
			if (res.status == 0) {
				that.setState({
					data: res.body
				});
			} else {
				console.log('get出错');
			}
		})
	},
	handleMessageSubmit: function(message) {
		var that = this;
		var infoObj = {
			name: message.name,
			message: message.message
		}
		infoObj = JSON.stringify(infoObj);
		/*console.log('infoObj', infoObj);*/
		this.ajax('post', this.props.postUrl, true, infoObj, function(res) {
			if (res.status == 0) {
				that.ajax('get', that.props.getUrl, true, null, function(res) {
					if (res.status == 0) {
						that.setState({
							data: res.body
						});
					} else {
						console.log('get出错');
					}
				})
			} else {
				console.log('post出错');
			}
		})
	},
	render: function() {
		return (
			<div className="messageBoard">
				<h3>{this.props.title}</h3>
				<MessageList data={this.state.data} />
				<MessageForm onMessageSubmit={this.handleMessageSubmit}/>
			</div>
		)
	}
})

module.exports = MessageBoard;