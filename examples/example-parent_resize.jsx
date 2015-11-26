var React = require('react');
var ReactDOM = require('react-dom');
var KittenHeroList = require('./example-hero.jsx');
var KittenPicker = require('./example-custom_children.jsx');

var KittenWidthPicker = React.createClass({
	getInitialState(){
		return {
			width: 100
		};
	},
	change(syntheticChangeEvent){
		var widthPicker = this;
		console.log(syntheticChangeEvent);
		widthPicker.setState({
				width: syntheticChangeEvent.target.value,
				display: 'none'
			},
			()=> {
				setTimeout(
					()=> {
						widthPicker.setState({
							display: 'block'
						})
					},
					1000
				);
			});
	},
	getSizeOptions(){
		var sizeList = [100, 75, 50, 33];
		var options = sizeList.map((item, index) => {
			return <option key={`option-${index}`} value={item}>{item}</option>;
		});
		return (
			<select className="form-control" onChange={this.change}>
				{options}
			</select>
		)
	},
	render(){
		var widthPicker = this;
		var props = {
			style: {
				display: widthPicker.state.display,
				margin: '0 auto',
				width: `${widthPicker.state.width}%`
			}
		};
		var sizeOptions = widthPicker.getSizeOptions();
		return (
			<div {...props}>
				{sizeOptions}
				<KittenPicker data={kittenProductList}/>
			</div>
		);
	}
});

ReactDOM.render(
	<KittenWidthPicker />,
	document.getElementById('example-parent_resize')
);
