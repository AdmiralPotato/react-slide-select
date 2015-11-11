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
		var className = 'arrow ' + (this.props.direction === 1 ? 'next' : 'prev') + (arrow.props.active ? ' active' : '');
		var content = (this.props.direction === 1 ? '>' : '<');
		return (
			<div className={className}>
				<a onMouseDown={arrow.click} onTouchStart={arrow.click}><span>{content}</span></a>
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
		return (
			<li className={className}>
				<a onMouseDown={dot.click} onTouchStart={dot.click} title={dot.props.slideName}><span>{dot.props.index}</span></a>
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
				{visibleProducts: 2.5, size: 0},
				{visibleProducts: 3.5, size: 470},
				{visibleProducts: 3.75, size: 630},
				{visibleProducts: 4.5, size: 710},
				{visibleProducts: 5.5, size: 950},
				{visibleProducts: 6.5, size: 1010}
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
			width: 0,
			needsResizeUpdate: true,
			targetIndex: 0,
			touchStartX: 0,
			supportsTouch: false
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
		//reference: http://stackoverflow.com/questions/19014250/reactjs-rerender-on-browser-resize
		if (this.state.needsResizeUpdate) {
			var holder = ReactDOM.findDOMNode(this.refs['holder']);
			var width = holder ? holder.clientWidth : 0;
			this.setState({
				width: width,
				x: width * this.state.targetIndex,
				needsResizeUpdate: false,
				//We tried feature detection.
				//Even Modernizr's approach didn't work in all important cases. This is comprehensive _enough_.
				supportsTouch: navigator.userAgent.indexOf('Mobile') !== -1
			});
		}
	},
	createTransition(targetValues, duration){
		var slider = this;
		var startValues = {};
		var propertyName, startTime;
		var animationCallback = (time) => {
			startTime = startTime === undefined ? time : startTime;
			var currentValues = {};
			var timeDiff = time - startTime;
			var progressFraction = Math.min(1, Math.max(0, timeDiff / duration));
			var propertyName;
			var propertyDiff;
			if(progressFraction !== 1){
				requestAnimationFrame(animationCallback);
			}
			for(propertyName in targetValues){
				if(targetValues.hasOwnProperty(propertyName)){
					propertyDiff = targetValues[propertyName] - startValues[propertyName];
					currentValues[propertyName] = startValues[propertyName] + (propertyDiff * progressFraction);
				}
			}
			slider.setState(currentValues);
		};
		for(propertyName in targetValues){
			if(targetValues.hasOwnProperty(propertyName)){
				if(slider.state.hasOwnProperty(propertyName)){
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
			targetIndex: index
		});
		slider.createTransition(
			{
				x: this.state.width * index * slider.getProductWidthRatio()
			},
			1000
		);
	},
	prevNext(direction){
		var slider = this;
		var index = slider.state.targetIndex + direction % slider.props.items.length;
		if (index < 0) {
			index = slider.props.items.length - index;
		}
		slider.changeIndex(index);
	},
	getProductWidthRatio(){
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
			result = 1 / breakpoint.visibleProducts;
		}
		return result;
	},
	getSlides(){
		var slider = this;
		var slideList = [];
		var widthRatio = slider.getProductWidthRatio();
		var slideWidth = Math.floor(slider.state.width * widthRatio);
		var sliderProps = {
			className: 'slideList',
			style: {
				width: (slideWidth * slider.props.items.length) + 'px'
			}
		};
		var setLength = slider.props.items.length;
		var onSelect = (something) => {
			slider.props.onSelect(something);
		};
		slider.props.items.forEach((item, index) => {
			var slideProps = {
				key: 'slide-' + index,
				data: item,
				index: index,
				setLength: setLength,
				width: slideWidth,
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
		if (this.props.showDots) {
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
		if (slider.props.showArrows) {
			var prevActive = slider.state.targetIndex !== 0;
			var nextActive = slider.state.targetIndex !== slider.props.items.length - 1;
			arrows.push(<Arrow key="prev" direction={-1} active={prevActive} prevNext={slider.prevNext}/>);
			arrows.push(<Arrow key="next" direction={ 1} active={nextActive} prevNext={slider.prevNext}/>);
		}
		return arrows;
	},
	render(){
		var slider = this;
		var slideSelectProps = {
			ref: 'slider',
			className: `SlideSelect ${slider.state.supportsTouch ? 'nativeScroll ' : ''}${slider.props.type}`
		};
		var slides = slider.getSlides();
		var dots = slider.getDots();
		var arrows = slider.getArrows();
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
