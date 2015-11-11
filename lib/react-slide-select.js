'use strict';

var Arrow = React.createClass({
	getDefaultProps: function getDefaultProps() {
		return {
			active: true,
			direction: 1,
			prevNext: function prevNext() {}
		};
	},
	click: function click(syntheticClickEvent) {
		syntheticClickEvent.preventDefault();
		syntheticClickEvent.stopPropagation();
		if (this.props.active) {
			this.props.prevNext(this.props.direction);
		}
	},
	render: function render() {
		var arrow = this;
		var className = 'arrow ' + (this.props.direction === 1 ? 'next' : 'prev') + (arrow.props.active ? ' active' : '');
		var content = this.props.direction === 1 ? '>' : '<';
		return React.createElement(
			'div',
			{ className: className },
			React.createElement(
				'a',
				{ onMouseDown: arrow.click, onTouchStart: arrow.click },
				React.createElement(
					'span',
					null,
					content
				)
			)
		);
	}
});

var Dot = React.createClass({
	getDefaultProps: function getDefaultProps() {
		return {
			active: false,
			index: 0
		};
	},
	click: function click(syntheticClickEvent) {
		syntheticClickEvent.preventDefault();
		syntheticClickEvent.stopPropagation();
		this.props.changeIndex(this.props.index);
	},
	render: function render() {
		var dot = this;
		var className = this.props.active ? 'active' : '';
		return React.createElement(
			'li',
			{ className: className },
			React.createElement(
				'a',
				{ onMouseDown: dot.click, onTouchStart: dot.click, title: dot.props.slideName },
				React.createElement(
					'span',
					null,
					dot.props.index
				)
			)
		);
	}
});

var HeroSlide = React.createClass({
	getDefaultProps: function getDefaultProps() {
		return {
			data: 'Hero Name',
			width: 0,
			index: 0,
			setLength: 1
		};
	},
	render: function render() {
		var slide = this;
		var slideOptions = {
			slideName: slide.props.data,
			style: {
				backgroundColor: 'hsl(' + Math.round(slide.props.index / slide.props.setLength * 360) + ', 100%, 50%)',
				width: slide.props.width + 'px'
			},
			onTouchStart: slide.props.touchStart,
			onTouchMove: slide.props.touchMove
		};
		return React.createElement(
			'li',
			slideOptions,
			slide.props.data
		);
	}
});

var ProductSlide = React.createClass({
	getDefaultProps: function getDefaultProps() {
		return {
			data: {
				brand: "FreshLook",
				id: "000732",
				manufacturer: "Alcon",
				name: "FreshLook Colorblends",
				images: [{
					"smallUrl": "https://media.1800contacts.com/is/image/1800Contacts/mainproductimage?$image=1800Contacts/000732_demandware&fmt=png-alpha&wid=250&hei=138&op_sharpen=1",
					"mediumUrl": "https://media.1800contacts.com/is/image/1800Contacts/mainproductimage?$image=1800Contacts/000732_demandware&fmt=png-alpha&wid=350&hei=193&op_sharpen=1",
					"largeUrl": "https://media.1800contacts.com/is/image/1800Contacts/mainproductimage?$image=1800Contacts/000732_demandware&fmt=png-alpha&wid=500&hei=278&op_sharpen=1"
				}]
			},
			width: 0,
			index: 0,
			setLength: 1
		};
	},
	render: function render() {
		var slide = this;
		var slideOptions = {
			style: {
				width: slide.props.width + 'px'
			},
			onTouchStart: slide.props.touchStart,
			onTouchMove: slide.props.touchMove
		};
		return React.createElement(
			'li',
			slideOptions,
			React.createElement(
				'a',
				{ onSelect: slide.props.onSelect },
				' ',
				React.createElement('img', { src: slide.props.data.images[0].smallUrl }),
				React.createElement(
					'span',
					null,
					slide.props.data.name
				),
				' '
			)
		);
	}
});

var slideTypeMap = {
	product: ProductSlide,
	hero: HeroSlide
};

var SlideSelect = React.createClass({
	getDefaultProps: function getDefaultProps() {
		return {
			type: 'product',
			items: [],
			showDots: false,
			showArrows: true,
			productSizes: [{ visibleProducts: 2.5, size: 0 }, { visibleProducts: 3.5, size: 470 }, { visibleProducts: 3.75, size: 630 }, { visibleProducts: 4.5, size: 710 }, { visibleProducts: 5.5, size: 950 }, { visibleProducts: 6.5, size: 1010 }],
			fullWidth: false,
			onSelect: function onSelect(data) {
				alert('It is intended that you will provide your own method in the onSelect prop for the\n\t\t\t\t\tSlideSelect component, but here\'s what your function would receive on select:\n\t\t\t\t\t' + JSON.stringify(data, null, '\t'));
			}
		};
	},
	getInitialState: function getInitialState() {
		return {
			x: 0,
			momentum: 0,
			width: 0,
			needsResizeUpdate: true,
			targetIndex: 0,
			touchStartX: 0
		};
	},
	componentDidUpdate: function componentDidUpdate() {
		this.updateDimensions();
		var sliderElement = ReactDOM.findDOMNode(this.refs['slider']);
		sliderElement.scrollLeft = this.state.x;
	},
	componentDidMount: function componentDidMount() {
		window.addEventListener('resize', this.invalidateDimensions);
		this.updateDimensions();
	},
	componentWillUnmount: function componentWillUnmount() {
		window.removeEventListener('resize', this.invalidateDimensions);
		this.updateDimensions();
	},
	invalidateDimensions: function invalidateDimensions() {
		this.setState({
			needsResizeUpdate: true
		});
	},
	updateDimensions: function updateDimensions() {
		//reference: http://stackoverflow.com/questions/19014250/reactjs-rerender-on-browser-resize
		if (this.state.needsResizeUpdate) {
			var holder = ReactDOM.findDOMNode(this.refs['holder']);
			var width = holder ? holder.clientWidth : 0;
			this.setState({
				width: width,
				x: width * this.state.targetIndex,
				needsResizeUpdate: false
			});
		}
	},
	changeIndex: function changeIndex(index) {
		var slider = this;
		slider.setState({
			momentum: 0,
			targetIndex: index,
			x: this.state.width * index * slider.getProductWidthRatio()
		});
	},
	prevNext: function prevNext(direction) {
		var slider = this;
		var index = slider.state.targetIndex + direction % slider.props.items.length;
		if (index < 0) {
			index = slider.props.items.length - index;
		}
		slider.changeIndex(index);
	},
	getProductWidthRatio: function getProductWidthRatio() {
		var slider = this;
		var result = 1;
		if (slider.props.fullWidth === false) {
			var widthList = slider.props.productSizes.slice();
			var breakpoint;
			while (widthList.length) {
				breakpoint = widthList.pop();
				if (breakpoint.size < slider.state.width) {
					break;
				}
			}
			console.log(slider.state.width, breakpoint.size);
			result = 1 / breakpoint.visibleProducts;
		}
		return result;
	},
	getSlides: function getSlides() {
		var _this = this;

		var slider = this;
		var slideList = [];
		var widthRatio = slider.getProductWidthRatio();
		var slideWidth = Math.floor(slider.state.width * widthRatio);
		var sliderProps = {
			className: 'slideList',
			style: {
				width: slideWidth * slider.props.items.length + 'px'
			}
		};
		var setLength = slider.props.items.length;
		var onSelect = function onSelect(something) {
			slider.props.onSelect(something);
		};
		slider.props.items.forEach(function (item, index) {
			var slideProps = {
				key: 'slide-' + index,
				data: item,
				index: index,
				setLength: setLength,
				width: slideWidth,
				onSelect: onSelect
			};
			var SlideType = slideTypeMap[_this.props.type];
			slideList.push(React.createElement(SlideType, slideProps));
		});
		return React.createElement(
			'ul',
			sliderProps,
			slideList
		);
	},
	getDots: function getDots() {
		var result;
		var slider = this;
		if (this.props.showDots) {
			var dotList = [];
			var changeIndex = function changeIndex(index) {
				slider.changeIndex(index);
			};
			slider.props.items.forEach(function (item, index) {
				var dotProps = {
					key: 'dot-' + index,
					changeIndex: changeIndex,
					index: index,
					slideName: item,
					active: slider.state.targetIndex === index
				};
				dotList.push(React.createElement(Dot, dotProps));
			});
			result = React.createElement(
				'ul',
				{ className: 'dotList' },
				dotList
			);
		}
		return result;
	},
	getArrows: function getArrows() {
		var slider = this;
		var arrows = [];
		if (slider.props.showArrows) {
			var prevActive = slider.state.targetIndex !== 0;
			var nextActive = slider.state.targetIndex !== slider.props.items.length - 1;
			arrows.push(React.createElement(Arrow, { key: 'prev', direction: -1, active: prevActive, prevNext: slider.prevNext }));
			arrows.push(React.createElement(Arrow, { key: 'next', direction: 1, active: nextActive, prevNext: slider.prevNext }));
		}
		return arrows;
	},
	render: function render() {
		var slider = this;
		var slideSelectProps = {
			ref: 'slider',
			className: 'SlideSelect nativeScroll ' + slider.props.type
		};
		var slides = slider.getSlides();
		var dots = slider.getDots();
		var arrows = slider.getArrows();
		return React.createElement(
			'div',
			{ className: 'SlideSelectHolder', ref: 'holder' },
			React.createElement(
				'div',
				slideSelectProps,
				slides
			),
			dots,
			arrows
		);
	}
});
//# sourceMappingURL=react-slide-select.js.map