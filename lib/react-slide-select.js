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
				onTouchStart: dot.click
			};
			return React.createElement(
				'li',
				{ className: className },
				React.createElement('a', dotProps)
			);
		}
	});
	
	var Slide = function Slide(props) {
		return React.createElement(
			'li',
			{ style: { width: props.width + 'px' } },
			props.children
		);
	};
	
	var SlideSelect = React.createClass({
		displayName: 'SlideSelect',
		getDefaultProps: function getDefaultProps() {
			return {
				showDots: false,
				showArrows: true,
				productSizes: [{ showArrows: 0, showDots: 0, visibleProducts: 2.5, size: 0 }, { showArrows: 0, showDots: 0, visibleProducts: 3.5, size: 470 }, { showArrows: 1, showDots: 1, visibleProducts: 3.75, size: 630 }, { showArrows: 1, showDots: 1, visibleProducts: 4.5, size: 710 }, { showArrows: 1, showDots: 1, visibleProducts: 5.5, size: 950 }, { showArrows: 1, showDots: 1, visibleProducts: 6.5, size: 1010 }],
				fullWidth: false
			};
		},
		getInitialState: function getInitialState() {
			return {
				x: 0,
				scrollDirection: 0,
				holderWidth: 0,
				slideWidth: 0,
				contentWidth: 0,
				numSlides: React.Children.count(this.props.children),
				needsResizeUpdate: true,
				targetIndex: 0,
				startDragX: 0,
				supportsTouch: false,
				suppressIndexUpdate: false,
				howManySlidesFitOnScreenCompletely: 0,
				lastAnimationStartTime: 0,
				showArrows: false,
				show: false,
				useNativeScroll: false,
				useScrollSnap: false,
				startDragId: null
			};
		},
		componentDidUpdate: function componentDidUpdate() {
			var slider = this;
			slider.updateDimensions();
			var sliderElement = ReactDOM.findDOMNode(slider.refs['slider']);
			if (!slider.state.useScrollSnap) {
				sliderElement.scrollLeft = slider.state.x;
			}
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
				var howManySlidesFitOnScreenCompletely = Math.floor(holderWidth / slideWidth);
				var contentWidth = slideWidth * slider.state.numSlides;
				var doWeHaveEnoughContentToScroll = contentWidth > holderWidth;
				var showDotsAtBreakpoint = slider.getPropertiesAtBreakpoint(holderWidth).showDots;
				var showDots = slider.props.showDots && (slider.props.fullWidth || showDotsAtBreakpoint && doWeHaveEnoughContentToScroll);
				var showArrowsAtBreakpoint = slider.getPropertiesAtBreakpoint(holderWidth).showArrows;
				var showArrows = slider.props.showArrows && showArrowsAtBreakpoint && doWeHaveEnoughContentToScroll;
				var forceNativeScrollFallback = !showDots && !showArrows && doWeHaveEnoughContentToScroll;
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
					showDots: showDots,
					useNativeScroll: useNativeScroll,
					useScrollSnap: slider.props.fullWidth
				});
			}
		},
		createTransition: function createTransition(args) {
			var targetValues = args.targetValues;
			var duration = args.duration || 2000;
			var interpolationMethod = args.interpolationMethod || function (k) {
				return k;
			};
			var callback = args.callback || function () {};
			var slider = this;
			var startValues = {};
			var propertyName, startTime;
			var animationCallback = function animationCallback(time) {
				startTime = startTime === undefined ? time : startTime;
				if (startTime >= slider.state.lastAnimationStartTime) {
					var currentValues = {
						lastAnimationStartTime: startTime
					};
					var timeDiff = time - startTime;
					var progressFraction = interpolationMethod(Math.min(1, Math.max(0, timeDiff / duration)));
					var propertyName;
					var propertyDiff;
					for (propertyName in targetValues) {
						if (targetValues.hasOwnProperty(propertyName)) {
							propertyDiff = targetValues[propertyName] - startValues[propertyName];
							currentValues[propertyName] = startValues[propertyName] + propertyDiff * progressFraction;
						}
					}
					slider.setState(currentValues, function () {
						if (progressFraction !== 1) {
							requestAnimationFrame(animationCallback);
						} else {
							requestAnimationFrame(callback);
						}
					});
				}
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
				scrollDirection: 0,
				suppressIndexScrollUpdate: true,
				useNativeScroll: false
			});
			slider.createTransition({
				targetValues: {
					x: this.state.slideWidth * index
				},
				interpolationMethod: function interpolationMethod(k) {
					//reference: Circular.Out; https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L562
					return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
					//return Math.sqrt(1 - (--k * k));
				},
				callback: function callback() {
					slider.setState({
						suppressIndexScrollUpdate: false,
						needsResizeUpdate: true
					});
					slider.updateDimensions();
				}
			});
		},
		prevNext: function prevNext(direction) {
			var slider = this;
			var index = Math.max(0, Math.min(slider.state.numSlides - 1, slider.state.targetIndex + direction * slider.state.howManySlidesFitOnScreenCompletely));
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
			var slider = this;
			var slideList = [];
			var sliderProps = {
				className: 'slideList',
				style: {
					width: slider.state.contentWidth + 'px'
				}
			};
			if (slider.state.useScrollSnap) {
				sliderProps.style.transform = 'translate3d(' + -slider.state.x + 'px, 0, 0)';
			}
			if (slider.state.numSlides < 1) {
				throw new Error('You must pass children to the SlideSelect component.');
			}
			React.Children.forEach(slider.props.children, function (child, index) {
				var slideProps = {
					key: 'slide-' + index,
					width: slider.state.slideWidth
				};
				slideList.push(React.createElement(
					Slide,
					slideProps,
					child
				));
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
			if (slider.state.showDots) {
				var dotList = [];
				var changeIndex = function changeIndex(index) {
					slider.changeIndex(index);
				};
				React.Children.forEach(slider.props.children, function (item, index) {
					var dotProps = {
						key: 'dot-' + index,
						changeIndex: changeIndex,
						index: index,
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
				var nextActive = slider.state.targetIndex !== slider.state.numSlides - 1;
				arrows.push(React.createElement(Arrow, { key: 'prev', direction: -1, active: prevActive, prevNext: slider.prevNext }));
				arrows.push(React.createElement(Arrow, { key: 'next', direction: 1, active: nextActive, prevNext: slider.prevNext }));
			}
			return arrows;
		},
		boundValue: function boundValue(min, max, value) {
			return Math.max(min, Math.min(max, value));
		},
		snapToNearestSlideIndexOnScrollStop: function snapToNearestSlideIndexOnScrollStop() {
			var slider = this;
			var requestedIndex = slider.state.targetIndex + slider.state.scrollDirection;
			var targetIndex = slider.boundValue(0, slider.state.numSlides - 1, requestedIndex);
			slider.changeIndex(targetIndex);
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
					newState.targetIndex = Math.round(scrollCompletionRatio * (slider.state.numSlides - 1));
				}
				slider.setState(newState);
			}
		},
		getRelativeDragDirection: function getRelativeDragDirection(x) {
			var slider = this;
			var xDiff = x - slider.state.startX;
			var sign = xDiff / Math.abs(xDiff);
			return isNaN(sign) ? 0 : sign;
		},
		dragStart: function dragStart(point) {
			var slider = this;
			slider.setState({
				startDragId: point.id,
				startDragX: point.x,
				startDragY: point.y,
				startX: slider.state.x
			});
		},
		getAbsoluteXFromRelativeX: function getAbsoluteXFromRelativeX(x) {
			var slider = this;
			return slider.state.startX + (slider.state.startDragX - x);
		},
		dragMove: function dragMove(point, event) {
			event.persist();
			var slider = this;
			if (Math.abs(point.y - slider.state.startDragY) < 50) {
				event.preventDefault();
				var x = slider.getAbsoluteXFromRelativeX(point.x);
				slider.setState({
					x: x
				});
			}
		},
		dragEnd: function dragEnd(point, event) {
			var slider = this;
			if (slider.state.startDragId !== null) {
				var newState = {
					startDragId: null
				};
				if (Math.abs(point.y - slider.state.startDragY) < 50) {
					event.preventDefault();
					var x = slider.getAbsoluteXFromRelativeX(point.x);
					newState.x = x;
					newState.scrollDirection = slider.getRelativeDragDirection(x);
				} else {
					newState.scrollDirection = 0;
				}
				slider.setState(newState, function () {
					slider.snapToNearestSlideIndexOnScrollStop();
				});
			}
		},
		getPointByTouch: function getPointByTouch(syntheticTouchEvent) {
			var slider = this;
			var touches = syntheticTouchEvent.changedTouches;
			var result = null;
			var point = null;
			if (slider.state.startDragId === null) {
				result = touches[0];
			} else {
				for (var i = 0; i < touches.length; i++) {
					var touch = touches[i];
					if (touch.identifier === slider.state.startDragId) {
						result = touch;
						break;
					}
				}
			}
			if (result) {
				point = {
					x: result.clientX,
					y: result.screenY,
					id: result.identifier
				};
			}
			return point;
		},
		getPointByMouse: function getPointByMouse(syntheticMouseEvent) {
			var result = null;
			var button = syntheticMouseEvent.buttons;
			var isNotMoveEvent = syntheticMouseEvent.type !== 'mousemove';
			var isMoveEventAndMouseDown = syntheticMouseEvent.type === 'mousemove' && (button === 1 || button === 4);
			if (isNotMoveEvent || isMoveEventAndMouseDown) {
				result = {
					x: syntheticMouseEvent.clientX,
					y: 0, //we're not scrolling the page Y with this device, never report
					id: 'mouse'
				};
			}
			return result;
		},
		handleMouse: function handleMouse(eventName) {
			var slider = this;
			return function (syntheticMouseEvent) {
				var point = slider.getPointByMouse(syntheticMouseEvent);
				if (point) {
					slider['drag' + eventName](point, syntheticMouseEvent);
				}
			};
		},
		handleTouch: function handleTouch(eventName) {
			var slider = this;
			return function (syntheticTouchEvent) {
				var point = slider.getPointByTouch(syntheticTouchEvent);
				if (point) {
					slider['drag' + eventName](point, syntheticTouchEvent);
				}
			};
		},
		render: function render() {
			var slider = this;
			var slides = slider.getSlides();
			var dots = slider.getDots();
			var arrows = slider.getArrows();
			var className = ['SlideSelect'];
			if (slider.state.useNativeScroll && !slider.state.useScrollSnap) {
				className.push('nativeScroll');
			}
			if (!slider.state.useScrollSnap) {
				className.push('momentumScroll');
			}
			var slideSelectProps = {
				ref: 'slider',
				className: className.join(' '),
				onScroll: slider.handleScroll
			};
			if (slider.state.useScrollSnap) {
				slideSelectProps.onMouseDown = slider.handleMouse('Start');
				slideSelectProps.onMouseMove = slider.handleMouse('Move');
				slideSelectProps.onMouseUp = slider.handleMouse('End');
				slideSelectProps.onMouseLeave = slider.handleMouse('End');
				slideSelectProps.onTouchStart = slider.handleTouch('Start');
				slideSelectProps.onTouchMove = slider.handleTouch('Move');
				slideSelectProps.onTouchEnd = slider.handleTouch('End');
			}
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