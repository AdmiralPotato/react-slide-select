var React = require('react');
var ReactDOM = require('react-dom');
var SlideSelect = require('../lib/react-slide-select');

var KittenHero = (props) => {
	return (
		<div {...{
			className: 'hero',
			style: {
				backgroundImage: `url('${props.data.large}')`
			}
		}}>
			{props.data.name}
		</div>
	);
};

var KittenHeroList = React.createClass({
	changeIndex(index){
		this.refs.slider.changeIndex(index);
	},
	render(){
		var props = this.props;
		var heroList = props.data.map((item, index) => {
			var itemProps = {
				key: 'hero-' + index,
				data: item
			};
			return (<KittenHero {...itemProps} />);
		});
		return (
			<div className="KittenHeroList">
				<SlideSelect {...{
					ref: 'slider',
					showDots: true,
					showArrows: true,
					fullWidth: true
				}}>
					{heroList}
				</SlideSelect>
			</div>
		);
	}
});

module.exports = KittenHeroList;

ReactDOM.render(
	<KittenHeroList data={kittenProductList}/>,
	document.getElementById('example-hero')
);
