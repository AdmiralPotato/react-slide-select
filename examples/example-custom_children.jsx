var React = require('react');
var ReactDOM = require('react-dom');
var SlideSelect = require('../lib/react-slide-select');

var KittenProduct = (props) => {
	return (
		<a className={`kittenProduct${props.isSelected ? ' selected' : ''}`} onClick={props.click}>
			<img src={props.data.image}/>
			<span>{props.data.name}</span>
		</a>
	);
};

var KittenPicker = React.createClass({
	getDefaultProps(){
		return {
			data: [],
			onSelect: function(kittenIndex) {
				console.log('Kitten Picked!', kittenIndex);
			}
		}
	},
	getInitialState(){
		return {
			selectedIndex: -1
		}
	},
	pickKitten(kittenIndex){
		var kittenPicker = this;
		kittenPicker.setState({
			selectedIndex: (kittenIndex === kittenPicker.state.selectedIndex) ? -1 : kittenIndex
		});
		kittenPicker.props.onSelect(kittenIndex);
	},
	getKittenProductList(){
		var kittenPicker = this;
		var kittenProductList = [];
		kittenPicker.props.data.forEach(function(item, index) {
			var kittenProps = {
				key: 'kp-' + index,
				isSelected: kittenPicker.state.selectedIndex === index,
				data: item,
				click: ()=> {
					kittenPicker.pickKitten(index);
				}
			};
			kittenProductList.push(<KittenProduct {...kittenProps} />);
		});
		return kittenProductList;
	},
	render() {
		var kittenPicker = this;
		var kittenProductList = kittenPicker.getKittenProductList();

		return (
			<div className="KittenPicker">
				<SlideSelect>
					{kittenProductList}
				</SlideSelect>
			</div>
		);
	}
});

module.exports = KittenPicker;

ReactDOM.render(
	<KittenPicker data={kittenProductList}/>,
	document.getElementById('example-custom_children')
);
