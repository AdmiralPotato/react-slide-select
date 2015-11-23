var React = require('react');
var ReactDOM = require('react-dom');
var KittenHeroList = require('./example-hero.jsx');
var KittenPicker = require('./example-custom_children.jsx');


var KittenPickerAndScroller = React.createClass({
	getDefaultProps(){
		return {data: []};
	},
	render(){
		var pickScroller = this;
		var handleSelect = (index) => {
			this.refs.heroList.changeIndex(index);
		};
		return (
			<div>
				<KittenHeroList ref="heroList" data={pickScroller.props.data} />
				<KittenPicker onSelect={handleSelect} data={pickScroller.props.data} />
			</div>
		)
	}
});

ReactDOM.render(
	<KittenPickerAndScroller data={kittenProductList}/>,
	document.getElementById('example-change_index')
);
