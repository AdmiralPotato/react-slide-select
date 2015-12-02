var React = require('react');
var ReactDOM = require('react-dom');
var KittenPicker = require('./example-custom_children.jsx');

var KittenCountPicker = React.createClass({
	getDefaultProps(){
		return {
			data: []
		}
	},
	getInitialState(){
		return {
			count: this.props.data.length
		};
	},
	change(syntheticChangeEvent){
		var countPicker = this;
		console.log(syntheticChangeEvent);
		countPicker.setState({
			count: syntheticChangeEvent.target.value,
			display: 'none'
		});
	},
	getSizeOptions(){
		var countPicker = this;
		var allKittens = countPicker.props.data.length;
		var sizeList = [1, 2, 4, 8, allKittens].reverse();
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
		var countPicker = this;
		var props = {
			style: {
				className: 'KittenCountPicker'
			}
		};
		var sizeOptions = countPicker.getSizeOptions();
		var limitedKittenList = countPicker.props.data.slice();
		limitedKittenList.length = countPicker.state.count;
		return (
			<div {...props}>
				{sizeOptions}
				<KittenPicker data={limitedKittenList}/>
			</div>
		);
	}
});

ReactDOM.render(
	<KittenCountPicker data={kittenProductList} />,
	document.getElementById('example-children_change')
);
