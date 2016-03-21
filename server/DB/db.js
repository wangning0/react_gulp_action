var messages = [];

module.exports = {
	getMessage: function() {
		return messages;
	},
	save: function(name, message) {
		messages.push({
			name: name,
			message: message
		});
	}

}