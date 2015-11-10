'use strict';

var Dot = React.createClass({
	getDefaultProps: function getDefaultProps() {
		return {
			active: false,
			index: 0
		};
	},
	onClick: function onClick() {
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
				{ onClick: dot.onClick, title: dot.props.slideName },
				React.createElement(
					'span',
					null,
					dot.props.index
				)
			)
		);
	}
});

var Slide = React.createClass({
	getDefaultProps: function getDefaultProps() {
		return {
			color: '#369',
			width: 0,
			touchStart: function touchStart() {},
			touchMove: function touchMove() {}
		};
	},
	render: function render() {
		var slide = this;
		var slideOptions = {
			style: {
				backgroundColor: slide.props.color,
				width: slide.props.width + 'px'
			},
			onTouchStart: slide.props.touchStart,
			onTouchMove: slide.props.touchMove
		};
		return React.createElement(
			'li',
			slideOptions,
			this.props.slideName
		);
	}
});

var SlideSelect = React.createClass({
	getDefaultProps: function getDefaultProps() {
		return {
			showDots: false,
			showArrows: true
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
		this.setState({
			momentum: 0,
			targetIndex: index,
			x: this.state.width * index
		});
	},
	startMomentum: function startMomentum(syntheticTouchStartEvent) {
		console.log(syntheticTouchStartEvent);
		var slider = this;
		var startX = syntheticTouchStartEvent.touches[0].clientX;
		slider.setState({
			touchStartX: startX
		});
	},
	addMomentum: function addMomentum(syntheticTouchMoveEvent) {
		console.log(syntheticTouchMoveEvent);
		var slider = this;
		var incomingMomentum = slider.state.touchStartX - syntheticTouchMoveEvent.touches[0].clientX;
		var tick = function tick(time) {
			var momentum = slider.state.momentum > 0.1 ? slider.state.momentum * 0.7 : 0;
			momentum += incomingMomentum ? incomingMomentum * 0.01 : 0;
			slider.setState({
				momentum: momentum,
				x: slider.state.x += momentum
			});
			if (momentum !== 0) {
				requestAnimationFrame(tick);
			}
		};
		requestAnimationFrame(tick);
	},
	getSlides: function getSlides() {
		var slider = this;
		var slideList = [];
		var sliderProps = {
			className: 'slideList',
			style: {
				left: -slider.state.x + 'px',
				width: slider.props.items.length * slider.state.width + 'px'
			},
			onTouchStart: slider.startMomentum,
			onTouchMove: slider.addMomentum
		};
		slider.props.items.forEach(function (item, index) {
			var slideProps = {
				key: 'slide-' + index,
				slideName: item,
				color: 'hsl(' + Math.round(index / slider.props.items.length * 360) + ', 100%, 50%)',
				width: slider.state.width,
				touchStart: slider.startMomentum,
				touchMove: slider.addMomentum
			};
			slideList.push(React.createElement(Slide, slideProps));
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
				{ className: 'dotList', onTouchMove: this.addMomentum },
				dotList
			);
		}
		return result;
	},
	render: function render() {
		var slider = this;
		var slides = slider.getSlides();
		var dots = slider.getDots();
		return React.createElement(
			'div',
			{ className: 'SlideSelectHolder', ref: 'holder' },
			React.createElement(
				'div',
				{ className: 'SlideSelect' },
				slides,
				'     ',
				dots
			)
		);
	}
});
//# sourceMappingURL=react-slide-select.js.map