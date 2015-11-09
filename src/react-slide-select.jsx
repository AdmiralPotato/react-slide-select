var Dot = React.createClass({
	getDefaultProps(){
		return {
			active: false,
			index: 0
		};
	},
	onClick(){
		this.props.changeIndex(this.props.index);
	},
	render(){
		var dot = this;
		var className = this.props.active ? 'active' : '';
		return (
			<li className={className}>
				<a onClick={dot.onClick} title={dot.props.slideName}><span>{dot.props.index}</span></a>
			</li>
		);
	}
});

var Slide = React.createClass({
	render(){
		return (
			<li style={{
				backgroundColor: this.props.color,
				width: this.props.width + 'px'
			}}>
				{this.props.slideName}
			</li>
		);
	}
});

var SlideSelect = React.createClass({
	getDefaultProps(){
		return {
			showDots: false,
			showArrows: true
		};
	},
	getInitialState(){
		return {
			x: 0,
			momentum: 0,
			width: 0,
			needsResizeUpdate: true,
			targetIndex: 0
		};
	},
	componentDidUpdate(){
		this.updateDimensions();
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
				needsResizeUpdate: false
			});
		}
	},
	changeIndex(index){
		this.setState({
			targetIndex: index,
			x: this.state.width * index
		});
	},
	getSlides(){
		var slider = this;
		var slideList = [];
		var sliderProps = {
			className: 'slideList',
			style: {
				left: -slider.state.x + 'px',
				width: (slider.props.items.length * slider.state.width) + 'px'
			}
		};
		slider.props.items.forEach(function(item, index) {
			var slideProps = {
				key: 'slide-' + index,
				slideName: item,
				color: `hsl(${Math.round((index / slider.props.items.length) * 360)}, 100%, 50%)`,
				width: slider.state.width
			};
			slideList.push(
				<Slide {...slideProps} />
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
			slider.props.items.forEach(function(item, index) {
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
	render(){
		var slider = this;
		var slides = slider.getSlides();
		var dots = slider.getDots();
		return (
			<div className="SlideSelectHolder" ref="holder">
				<div className="SlideSelect">
					{slides}
					{dots}
				</div>
			</div>
		);
	}
});
