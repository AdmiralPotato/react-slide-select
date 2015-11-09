"use strict";

var Slide = React.createClass({
	render: function render() {
		return React.createElement(
			"li",
			{ style: { backgroundColor: this.props.color } },
			this.props.slideName
		);
	}
});

var SlideSelect = React.createClass({
	getInitialState: function getInitialState() {
		return {
			x: 0,
			momentum: 0
		};
	},
	render: function render() {
		this.state.momentum *= 0.95;
		var xPosition = this.state.x += this.state.momentum;
		var childList = [];
		this.props.items.forEach(function (item, index) {
			var color = "hsl(" + Math.round(Math.random() * 360) + ", 100%, 50%)";
			childList.push(React.createElement(Slide, { key: index, slideName: item, color: color }));
		});
		return React.createElement(
			"div",
			{ className: "SlideSelect" },
			React.createElement(
				"ul",
				{ style: { left: xPosition } },
				childList
			)
		);
	}
});
//# sourceMappingURL=react-slide-select.js.map