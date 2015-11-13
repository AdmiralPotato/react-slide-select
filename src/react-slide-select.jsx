var React = require('react');
var ReactDOM = require('react-dom');

var Arrow = React.createClass({
	getDefaultProps(){
		return {
			active: true,
			direction: 1,
			prevNext: () => {
			}
		}
	},
	click(syntheticClickEvent){
		syntheticClickEvent.preventDefault();
		syntheticClickEvent.stopPropagation();
		if (this.props.active) {
			this.props.prevNext(this.props.direction);
		}
	},
	render() {
		var arrow = this;
		var className = 'arrow ' + (arrow.props.direction === 1 ? 'next' : 'prev') + (arrow.props.active ? ' active' : '');
		var angle = `rotate(${arrow.props.direction === 1 ? 0 : 180})`;
		return (
			<div className={className}>
				<a onMouseDown={arrow.click} onTouchStart={arrow.click}>
					<svg height="32" width="32" viewBox="-16 -16 32 32" preserveAspectRatio="none">
						<g transform={angle}>
							<polyline points="-4,-12 8,0 -4,12 "/>
						</g>
					</svg>
				</a>
			</div>
		);
	}
});

var Dot = React.createClass({
	getDefaultProps(){
		return {
			active: false,
			index: 0
		};
	},
	click(syntheticClickEvent){
		syntheticClickEvent.preventDefault();
		syntheticClickEvent.stopPropagation();
		this.props.changeIndex(this.props.index);
	},
	render(){
		var dot = this;
		var className = this.props.active ? 'active' : '';
		var dotProps = {
			onMouseDown: dot.click,
			onTouchStart: dot.click,
			title: dot.props.slideName
		};
		return (
			<li className={className}>
				<a {...dotProps}><span>{dot.props.index}</span></a>
			</li>
		);
	}
});

var HeroSlide = React.createClass({
	getDefaultProps(){
		return {
			data: 'Hero Name',
			width: 0,
			index: 0,
			setLength: 1
		}
	},
	render(){
		var slide = this;
		var slideOptions = {
			slideName: slide.props.data,
			style: {
				backgroundColor: `hsl(${Math.round((slide.props.index / slide.props.setLength) * 360)}, 100%, 50%)`,
				width: slide.props.width + 'px'
			},
			onTouchStart: slide.props.touchStart,
			onTouchMove: slide.props.touchMove
		};
		return (
			<li {...slideOptions}>
				{slide.props.data}
			</li>
		);
	}
});

var ProductSlide = React.createClass({
	getDefaultProps(){
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
		}
	},
	click(){
		var slide = this;
		slide.props.onSelect(slide.props.data);
	},
	render(){
		var slide = this;
		var slideOptions = {
			style: {
				width: slide.props.width + 'px'
			},
			onTouchStart: slide.props.touchStart,
			onTouchMove: slide.props.touchMove
		};
		return (
			<li {...slideOptions}>
				<a onClick={this.click}> <img src={slide.props.data.images[0].smallUrl}/>
					<span>{slide.props.data.name}</span> </a>
			</li>
		);
	}
});

var slideTypeMap = {
	product: ProductSlide,
	hero: HeroSlide
};

var SlideSelect = React.createClass({
	getDefaultProps(){
		return {
			type: 'product',
			items: [],
			showDots: false,
			showArrows: true,
			productSizes: [
				{showArrows: 0, visibleProducts: 2.5, size: 0},
				{showArrows: 0, visibleProducts: 3.5, size: 470},
				{showArrows: 1, visibleProducts: 3.75, size: 630},
				{showArrows: 1, visibleProducts: 4.5, size: 710},
				{showArrows: 1, visibleProducts: 5.5, size: 950},
				{showArrows: 1, visibleProducts: 6.5, size: 1010}
			],
			fullWidth: false,
			onSelect: (data) => {
				alert(
					`It is intended that you will provide your own method in the onSelect prop for the
					SlideSelect component, but here's what your function would receive on select:
					${JSON.stringify(data, null, '\t')}`
				);
			}
		};
	},
	getInitialState(){
		return {
			x: 0,
			momentum: 0,
			holderWidth: 0,
			slideWidth: 0,
			contentWidth: 0,
			needsResizeUpdate: true,
			targetIndex: 0,
			touchStartX: 0,
			supportsTouch: false,
			suppressIndexUpdate: false,
			howManySlidesFitOnScreenCompletely: 0,
			showArrows: false,
			useNativeScroll: false
		};
	},
	componentDidUpdate(){
		this.updateDimensions();
		var sliderElement = ReactDOM.findDOMNode(this.refs['slider']);
		sliderElement.scrollLeft = this.state.x;
	},
	componentDidMount(){
		window.addEventListener('resize', this.invalidateDimensions);
		this.updateDimensions();
	},
	componentWillUnmount() {
		window.removeEventListener('resize', this.invalidateDimensions);
		this.updateDimensions();
	},
	invalidateDimensions(){
		this.setState({
			needsResizeUpdate: true
		});
	},
	updateDimensions(){
		var slider = this;
		//reference: http://stackoverflow.com/questions/19014250/reactjs-rerender-on-browser-resize
		if (slider.state.needsResizeUpdate) {
			var holder = ReactDOM.findDOMNode(slider.refs['holder']);
			var holderWidth = holder ? holder.clientWidth : 0;
			var slideWidthRatio = slider.getSlideWidthRatio(holderWidth);
			var slideWidth = Math.floor(holderWidth * slideWidthRatio);
			var numSlides = slider.props.items.length;
			var howManySlidesFitOnScreenCompletely = Math.floor(holderWidth / slideWidth);
			var contentWidth = slideWidth * numSlides;
			var doWeHaveEnoughContentToScroll = contentWidth > holderWidth;
			var showArrowsAtBreakpoint = slider.getPropertiesAtBreakpoint(holderWidth).showArrows;
			var showArrows = slider.props.showArrows && showArrowsAtBreakpoint && doWeHaveEnoughContentToScroll;
			var forceNativeScrollFallback = !showArrows && doWeHaveEnoughContentToScroll;
			//We tried feature detection.
			//Even Modernizr's approach didn't work in all important cases. This is comprehensive _enough_.
			var supportsTouch = navigator.userAgent.indexOf('Mobile') !== -1;
			var useNativeScroll = forceNativeScrollFallback || supportsTouch;
			this.setState({
				holderWidth: holderWidth,
				x: slideWidth * slider.state.targetIndex,
				slideWidth: slideWidth,
				contentWidth: contentWidth,
				needsResizeUpdate: false,
				howManySlidesFitOnScreenCompletely: howManySlidesFitOnScreenCompletely,
				showArrows: showArrows,
				useNativeScroll: useNativeScroll
			});
		}
	},
	createTransition(args){
		var targetValues = args.targetValues;
		var duration = args.duration || 1000;
		var interpolationMethod = args.interpolationMethod || ((k) => {
				return k
			});
		var callback = args.callback || (() => {
			});
		var slider = this;
		var startValues = {};
		var propertyName, startTime;
		var animationCallback = (time) => {
			startTime = startTime === undefined ? time : startTime;
			var currentValues = {};
			var timeDiff = time - startTime;
			var progressFraction = interpolationMethod(Math.min(1, Math.max(0, timeDiff / duration)));
			var propertyName;
			var propertyDiff;
			if (progressFraction !== 1) {
				requestAnimationFrame(animationCallback);
			} else {
				requestAnimationFrame(callback);
			}
			for (propertyName in targetValues) {
				if (targetValues.hasOwnProperty(propertyName)) {
					propertyDiff = targetValues[propertyName] - startValues[propertyName];
					currentValues[propertyName] = startValues[propertyName] + (propertyDiff * progressFraction);
				}
			}
			slider.setState(currentValues);
		};
		for (propertyName in targetValues) {
			if (targetValues.hasOwnProperty(propertyName)) {
				if (slider.state.hasOwnProperty(propertyName)) {
					startValues[propertyName] = slider.state[propertyName];
				} else {
					throw new Error(`Invalid property ${propertyName} - property does not exist on state object.`);
				}
			}
		}
		requestAnimationFrame(animationCallback);
	},
	changeIndex(index){
		var slider = this;
		slider.setState({
			targetIndex: index,
			suppressIndexScrollUpdate: true
		});
		slider.createTransition({
			targetValues: {
				x: this.state.slideWidth * index
			},
			interpolationMethod: (k) => {
				//reference: Circular.Out; https://github.com/tweenjs/tween.js/blob/master/src/Tween.js
				return Math.sqrt(1 - (--k * k));
			},
			callback: () => {
				slider.setState({
					suppressIndexScrollUpdate: false
				});
			}
		});
	},
	prevNext(direction){
		var slider = this;
		var numItems = slider.props.items.length;
		var index = Math.max(0, Math.min(numItems - 1,
			slider.state.targetIndex + direction * slider.state.howManySlidesFitOnScreenCompletely
		));
		slider.changeIndex(index);
	},
	getPropertiesAtBreakpoint(holderWidth){
		var slider = this;
		var widthList = slider.props.productSizes.slice();
		var breakpoint;
		while (widthList.length) {
			breakpoint = widthList.pop();
			if (breakpoint.size < holderWidth) {
				break;
			}
		}
		return breakpoint;
	},
	getSlideWidthRatio(holderWidth){
		var slider = this;
		var breakpoint = slider.getPropertiesAtBreakpoint(holderWidth);
		var result = 1;
		if (slider.props.fullWidth === false) {
			result = 1 / breakpoint.visibleProducts;
		}
		return result;
	},
	getSlides(){
		var slider = this;
		var slideList = [];
		var sliderProps = {
			className: 'slideList',
			style: {
				width: slider.state.contentWidth + 'px'
			}
		};
		var onSelect = (something) => {
			slider.props.onSelect(something);
		};
		slider.props.items.forEach((item, index) => {
			var slideProps = {
				key: 'slide-' + index,
				data: item,
				index: index,
				setLength: slider.props.items.length,
				width: slider.state.slideWidth,
				onSelect: onSelect
			};
			var SlideType = slideTypeMap[this.props.type];
			slideList.push(
				<SlideType {...slideProps} />
			);
		});
		return (
			<ul {...sliderProps}>
				{slideList}
			</ul>
		);
	},
	getDots(){
		var result;
		var slider = this;
		if (slider.props.showDots) {
			var dotList = [];
			var changeIndex = function(index) {
				slider.changeIndex(index);
			};
			slider.props.items.forEach((item, index) => {
				var dotProps = {
					key: 'dot-' + index,
					changeIndex: changeIndex,
					index: index,
					slideName: item,
					active: slider.state.targetIndex === index
				};
				dotList.push(
					<Dot {...dotProps} />
				);
			});
			result = (
				<ul className="dotList">
					{dotList}
				</ul>
			);
		}
		return result;
	},
	getArrows(){
		var slider = this;
		var arrows = [];
		if (slider.state.showArrows) {
			var prevActive = slider.state.targetIndex !== 0;
			var nextActive = slider.state.targetIndex !== slider.props.items.length - 1;
			arrows.push(<Arrow key="prev" direction={-1} active={prevActive} prevNext={slider.prevNext}/>);
			arrows.push(<Arrow key="next" direction={ 1} active={nextActive} prevNext={slider.prevNext}/>);
		}
		return arrows;
	},
	handleScroll(syntheticScrollEvent) {
		var slider = this;
		var x = syntheticScrollEvent.nativeEvent.target.scrollLeft;
		var maximumScrollPosition = slider.state.contentWidth - slider.state.holderWidth;
		var scrollCompletionRatio = x / maximumScrollPosition;
		//don't allow scroll bounce to set state
		if (x >= 0 && x <= maximumScrollPosition) {
			var newState = {
				x: x
			};
			if (!slider.state.suppressIndexScrollUpdate) {
				newState.targetIndex = Math.round(scrollCompletionRatio * (slider.props.items.length - 1));
			}
			slider.setState(newState);
		}
	},
	render(){
		var slider = this;
		var slides = slider.getSlides();
		var dots = slider.getDots();
		var arrows = slider.getArrows();
		var slideSelectProps = {
			ref: 'slider',
			className: `SlideSelect ${slider.state.useNativeScroll ? 'nativeScroll ' : ''}${slider.props.type}`,
			onScroll: slider.handleScroll
		};
		return (
			<div className="SlideSelectHolder" ref="holder">
				<div {...slideSelectProps}>
					{slides}
				</div>
				{dots}{arrows}
			</div>
		);
	}
});

module.exports = SlideSelect;
