var Slide = React.createClass({
	render(){
		return (
			<li style={{backgroundColor: this.props.color}}>
				{this.props.slideName}
			</li>
		);
	}
});

var SlideSelect = React.createClass({
	getInitialState: function(){
		return {
			x: 0,
			momentum: 0
		};
	},
	render(){
		this.state.momentum *= 0.95;
		var xPosition = this.state.x += this.state.momentum;
		var childList = [];
		this.props.items.forEach(function(item, index){
			var color = `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`;
			childList.push(
				<Slide key={index} slideName={item} color={color} />
			);
		});
		return (
			<div className="SlideSelect">
				<ul style={{left: xPosition}}>
					{childList}
				</ul>
			</div>
		);
	}
});
