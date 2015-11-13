(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["SlideSelect"] = factory(require("react"), require("react-dom"));
	else
		root["SlideSelect"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	
	var Arrow = React.createClass({
		displayName: 'Arrow',
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
			var className = 'arrow ' + (arrow.props.direction === 1 ? 'next' : 'prev') + (arrow.props.active ? ' active' : '');
			var angle = 'rotate(' + (arrow.props.direction === 1 ? 0 : 180) + ')';
			return React.createElement(
				'div',
				{ className: className },
				React.createElement(
					'a',
					{ onMouseDown: arrow.click, onTouchStart: arrow.click },
					React.createElement(
						'svg',
						{ height: '32', width: '32', viewBox: '-16 -16 32 32', preserveAspectRatio: 'none' },
						React.createElement(
							'g',
							{ transform: angle },
							React.createElement('polyline', { points: '-4,-12 8,0 -4,12 ' })
						)
					)
				)
			);
		}
	});
	
	var Dot = React.createClass({
		displayName: 'Dot',
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
			var dotProps = {
				onMouseDown: dot.click,
				onTouchStart: dot.click,
				title: dot.props.slideName
			};
			return React.createElement(
				'li',
				{ className: className },
				React.createElement(
					'a',
					dotProps,
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
		displayName: 'HeroSlide',
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
		displayName: 'ProductSlide',
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
		click: function click() {
			var slide = this;
			slide.props.onSelect(slide.props.data);
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
					{ onClick: this.click },
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
		displayName: 'SlideSelect',
		getDefaultProps: function getDefaultProps() {
			return {
				type: 'product',
				items: [],
				showDots: false,
				showArrows: true,
				productSizes: [{ showArrows: 0, visibleProducts: 2.5, size: 0 }, { showArrows: 0, visibleProducts: 3.5, size: 470 }, { showArrows: 1, visibleProducts: 3.75, size: 630 }, { showArrows: 1, visibleProducts: 4.5, size: 710 }, { showArrows: 1, visibleProducts: 5.5, size: 950 }, { showArrows: 1, visibleProducts: 6.5, size: 1010 }],
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
		createTransition: function createTransition(args) {
			var targetValues = args.targetValues;
			var duration = args.duration || 1000;
			var interpolationMethod = args.interpolationMethod || function (k) {
				return k;
			};
			var callback = args.callback || function () {};
			var slider = this;
			var startValues = {};
			var propertyName, startTime;
			var animationCallback = function animationCallback(time) {
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
						currentValues[propertyName] = startValues[propertyName] + propertyDiff * progressFraction;
					}
				}
				slider.setState(currentValues);
			};
			for (propertyName in targetValues) {
				if (targetValues.hasOwnProperty(propertyName)) {
					if (slider.state.hasOwnProperty(propertyName)) {
						startValues[propertyName] = slider.state[propertyName];
					} else {
						throw new Error('Invalid property ' + propertyName + ' - property does not exist on state object.');
					}
				}
			}
			requestAnimationFrame(animationCallback);
		},
		changeIndex: function changeIndex(index) {
			var slider = this;
			slider.setState({
				targetIndex: index,
				suppressIndexScrollUpdate: true
			});
			slider.createTransition({
				targetValues: {
					x: this.state.slideWidth * index
				},
				interpolationMethod: function interpolationMethod(k) {
					//reference: Circular.Out; https://github.com/tweenjs/tween.js/blob/master/src/Tween.js
					return Math.sqrt(1 - --k * k);
				},
				callback: function callback() {
					slider.setState({
						suppressIndexScrollUpdate: false
					});
				}
			});
		},
		prevNext: function prevNext(direction) {
			var slider = this;
			var numItems = slider.props.items.length;
			var index = Math.max(0, Math.min(numItems - 1, slider.state.targetIndex + direction * slider.state.howManySlidesFitOnScreenCompletely));
			slider.changeIndex(index);
		},
		getPropertiesAtBreakpoint: function getPropertiesAtBreakpoint(holderWidth) {
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
		getSlideWidthRatio: function getSlideWidthRatio(holderWidth) {
			var slider = this;
			var breakpoint = slider.getPropertiesAtBreakpoint(holderWidth);
			var result = 1;
			if (slider.props.fullWidth === false) {
				result = 1 / breakpoint.visibleProducts;
			}
			return result;
		},
		getSlides: function getSlides() {
			var _this = this;
	
			var slider = this;
			var slideList = [];
			var sliderProps = {
				className: 'slideList',
				style: {
					width: slider.state.contentWidth + 'px'
				}
			};
			var onSelect = function onSelect(something) {
				slider.props.onSelect(something);
			};
			slider.props.items.forEach(function (item, index) {
				var slideProps = {
					key: 'slide-' + index,
					data: item,
					index: index,
					setLength: slider.props.items.length,
					width: slider.state.slideWidth,
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
			if (slider.props.showDots) {
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
			if (slider.state.showArrows) {
				var prevActive = slider.state.targetIndex !== 0;
				var nextActive = slider.state.targetIndex !== slider.props.items.length - 1;
				arrows.push(React.createElement(Arrow, { key: 'prev', direction: -1, active: prevActive, prevNext: slider.prevNext }));
				arrows.push(React.createElement(Arrow, { key: 'next', direction: 1, active: nextActive, prevNext: slider.prevNext }));
			}
			return arrows;
		},
		handleScroll: function handleScroll(syntheticScrollEvent) {
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
		render: function render() {
			var slider = this;
			var slides = slider.getSlides();
			var dots = slider.getDots();
			var arrows = slider.getArrows();
			var slideSelectProps = {
				ref: 'slider',
				className: 'SlideSelect ' + (slider.state.useNativeScroll ? 'nativeScroll ' : '') + slider.props.type,
				onScroll: slider.handleScroll
			};
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
	
	module.exports = SlideSelect;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-slide-select.js.map