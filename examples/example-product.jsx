var React = require('react');
var ReactDOM = require('react-dom');
var SlideSelect = require('../lib/react-slide-select');
var ContactProduct = (props) => {
	return (
		<a onClick={props.click}>
			<img src={props.data.images[0].smallUrl}/>
			<span>{props.data.name}</span>
		</a>
	);
};

module.exports = ContactProduct;

var someExternalMethod = (data) => {
	console.log('A Contact Lens was selected.', data);
};

//productList is defined in ./example-product-data.js
var productComponentList = productList.map((item, index) => {
	var props = {
		data: item,
		key: 'contact-' + index,
		click: () => {
			someExternalMethod(item);
		}
	};
	return (<ContactProduct {...props} />);
});

ReactDOM.render(
	(
		<SlideSelect {...{
			type: 'product',
			showDots: false,
			showArrows: true
		}}>
			{productComponentList}
		</SlideSelect>
	),
	document.getElementById('example-product')
);
