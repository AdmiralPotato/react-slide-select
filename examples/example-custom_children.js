//kittenProductList is defined in ./example-custom_children-data.js

var KittenProduct = React.createClass({
	displayName: 'KittenProduct',
	getDefaultProps: function() {
		return {
			isSelected: false,
			data: {
				image: 'http://placekitten.com/150/150',
				name: 'Default Kitten'
			}
		};
	},
	render: function() {
		var kittenProduct = this;
		var props = {
			className: 'kittenProduct' + (kittenProduct.props.isSelected ? ' selected' : ''),
			onClick: kittenProduct.props.onClick
		};
		return React.createElement(
			'a',
			props,
			React.createElement(
				'img',
				{src: kittenProduct.props.data.image}
			),
			React.createElement(
				'span',
				{},
				kittenProduct.props.data.name
			)
		);
	}
});

var KittenPicker = React.createClass({
	displayName: 'KittenPicker',
	getDefaultProps: function() {
		return {
			data: []
		}
	},
	getInitialState: function() {
		return {
			selectedIndex: -1
		}
	},
	pickKitten: function(kittenIndex) {
		console.log('Kitten Picked!', kittenIndex);
		this.setState({
			selectedIndex: kittenIndex === this.state.selectedIndex ? -1 : kittenIndex
		});
	},
	getKittenProductList: function(){
		var kittenPicker = this;
		var kittenProductList = [];
		kittenPicker.props.data.forEach(function(item, index) {
			var kittenProps = {
				key: 'kp-' + index,
				isSelected: kittenPicker.state.selectedIndex === index,
				data: item
			};
			kittenProductList.push(
				React.createElement(
					KittenProduct,
					kittenProps
				)
			)
		});
		return kittenProductList;
	},
	render: function() {
		var kittenPicker = this;
		var kittenProductList = kittenPicker.getKittenProductList();

		return React.createElement(
			'div',
			{className: 'KittenPicker'},
			React.createElement(
				SlideSelect,
				{onSelect: kittenPicker.pickKitten},
				kittenProductList
			)
		);
	}
});

ReactDOM.render(
	React.createElement(
		KittenPicker,
		{
			data: kittenProductList
		}
	),
	document.getElementById('example-custom_children')
);
