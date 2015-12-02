/******/ (function(modules) { // webpackBootstrap
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

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	module.exports = __webpack_require__(9);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var SlideSelect = __webpack_require__(4);
	var ContactProduct = function ContactProduct(props) {
		return React.createElement(
			'a',
			{ onClick: props.click },
			React.createElement('img', { src: props.data.images[0].smallUrl }),
			React.createElement(
				'span',
				null,
				props.data.name
			)
		);
	};
	
	module.exports = ContactProduct;
	
	var someExternalMethod = function someExternalMethod(data) {
		console.log('A Contact Lens was selected.', data);
	};
	
	//productList is defined in ./example-product-data.js
	var productComponentList = productList.map(function (item, index) {
		var props = {
			data: item,
			key: 'contact-' + index,
			click: function click() {
				someExternalMethod(item);
			}
		};
		return React.createElement(ContactProduct, props);
	});
	
	ReactDOM.render(React.createElement(
		SlideSelect,
		{
			type: 'product',
			showDots: false,
			showArrows: true
		},
		productComponentList
	), document.getElementById('example-product'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = SlideSelect;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var SlideSelect = __webpack_require__(4);
	
	var KittenProduct = function KittenProduct(props) {
		return React.createElement(
			'a',
			{ className: 'kittenProduct' + (props.isSelected ? ' selected' : ''), onClick: props.click },
			React.createElement('img', { src: props.data.image }),
			React.createElement(
				'span',
				null,
				props.data.name
			)
		);
	};
	
	var KittenPicker = React.createClass({
		displayName: 'KittenPicker',
		getDefaultProps: function getDefaultProps() {
			return {
				data: [],
				onSelect: function onSelect(kittenIndex) {
					console.log('Kitten Picked!', kittenIndex);
				}
			};
		},
		getInitialState: function getInitialState() {
			return {
				selectedIndex: -1
			};
		},
		pickKitten: function pickKitten(kittenIndex) {
			var kittenPicker = this;
			kittenPicker.setState({
				selectedIndex: kittenIndex === kittenPicker.state.selectedIndex ? -1 : kittenIndex
			});
			kittenPicker.props.onSelect(kittenIndex);
		},
		getKittenProductList: function getKittenProductList() {
			var kittenPicker = this;
			var kittenProductList = [];
			kittenPicker.props.data.forEach(function (item, index) {
				var kittenProps = {
					key: 'kp-' + index,
					isSelected: kittenPicker.state.selectedIndex === index,
					data: item,
					click: function click() {
						kittenPicker.pickKitten(index);
					}
				};
				kittenProductList.push(React.createElement(KittenProduct, kittenProps));
			});
			return kittenProductList;
		},
		render: function render() {
			var kittenPicker = this;
			var kittenProductList = kittenPicker.getKittenProductList();
	
			return React.createElement(
				'div',
				{ className: 'KittenPicker' },
				React.createElement(
					SlideSelect,
					null,
					kittenProductList
				)
			);
		}
	});
	
	module.exports = KittenPicker;
	
	ReactDOM.render(React.createElement(KittenPicker, { data: kittenProductList }), document.getElementById('example-custom_children'));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var SlideSelect = __webpack_require__(4);
	
	var KittenHero = function KittenHero(props) {
		return React.createElement(
			'div',
			{
				className: 'hero',
				style: {
					backgroundImage: 'url(\'' + props.data.large + '\')'
				}
			},
			props.data.name
		);
	};
	
	var KittenHeroList = React.createClass({
		displayName: 'KittenHeroList',
		changeIndex: function changeIndex(index) {
			this.refs.slider.changeIndex(index);
		},
		render: function render() {
			var props = this.props;
			var heroList = props.data.map(function (item, index) {
				var itemProps = {
					key: 'hero-' + index,
					data: item
				};
				return React.createElement(KittenHero, itemProps);
			});
			return React.createElement(
				'div',
				{ className: 'KittenHeroList' },
				React.createElement(
					SlideSelect,
					{
						ref: 'slider',
						showDots: true,
						showArrows: true,
						fullWidth: true
					},
					heroList
				)
			);
		}
	});
	
	module.exports = KittenHeroList;
	
	ReactDOM.render(React.createElement(KittenHeroList, { data: kittenProductList }), document.getElementById('example-hero'));

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var KittenHeroList = __webpack_require__(6);
	var KittenPicker = __webpack_require__(5);
	
	var KittenPickerAndScroller = React.createClass({
		displayName: 'KittenPickerAndScroller',
		getDefaultProps: function getDefaultProps() {
			return { data: [] };
		},
		render: function render() {
			var _this = this;
	
			var pickScroller = this;
			var handleSelect = function handleSelect(index) {
				_this.refs.heroList.changeIndex(index);
			};
			return React.createElement(
				'div',
				null,
				React.createElement(KittenHeroList, { ref: 'heroList', data: pickScroller.props.data }),
				React.createElement(KittenPicker, { onSelect: handleSelect, data: pickScroller.props.data })
			);
		}
	});
	
	ReactDOM.render(React.createElement(KittenPickerAndScroller, { data: kittenProductList }), document.getElementById('example-change_index'));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var KittenPicker = __webpack_require__(5);
	
	var KittenWidthPicker = React.createClass({
		displayName: 'KittenWidthPicker',
		getInitialState: function getInitialState() {
			return {
				width: 100
			};
		},
		change: function change(syntheticChangeEvent) {
			var widthPicker = this;
			console.log(syntheticChangeEvent);
			widthPicker.setState({
				width: syntheticChangeEvent.target.value,
				display: 'none'
			}, function () {
				setTimeout(function () {
					widthPicker.setState({
						display: 'block'
					});
				}, 500);
			});
		},
		getSizeOptions: function getSizeOptions() {
			var sizeList = [100, 75, 50, 33];
			var options = sizeList.map(function (item, index) {
				return React.createElement(
					'option',
					{ key: 'option-' + index, value: item },
					item
				);
			});
			return React.createElement(
				'select',
				{ className: 'form-control', onChange: this.change },
				options
			);
		},
		render: function render() {
			var widthPicker = this;
			var props = {
				className: 'KittenWidthPicker',
				style: {
					display: widthPicker.state.display,
					margin: '0 auto',
					width: widthPicker.state.width + '%'
				}
			};
			var sizeOptions = widthPicker.getSizeOptions();
			return React.createElement(
				'div',
				props,
				sizeOptions,
				React.createElement(KittenPicker, { data: kittenProductList })
			);
		}
	});
	
	ReactDOM.render(React.createElement(KittenWidthPicker, null), document.getElementById('example-parent_resize'));

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var KittenPicker = __webpack_require__(5);
	
	var KittenCountPicker = React.createClass({
		displayName: 'KittenCountPicker',
		getDefaultProps: function getDefaultProps() {
			return {
				data: []
			};
		},
		getInitialState: function getInitialState() {
			return {
				count: this.props.data.length
			};
		},
		change: function change(syntheticChangeEvent) {
			var countPicker = this;
			console.log(syntheticChangeEvent);
			countPicker.setState({
				count: syntheticChangeEvent.target.value,
				display: 'none'
			});
		},
		getSizeOptions: function getSizeOptions() {
			var countPicker = this;
			var allKittens = countPicker.props.data.length;
			var sizeList = [1, 2, 3, 4, 5, 6, 8, allKittens].reverse();
			var options = sizeList.map(function (item, index) {
				return React.createElement(
					'option',
					{ key: 'option-' + index, value: item },
					item
				);
			});
			return React.createElement(
				'select',
				{ className: 'form-control', onChange: this.change },
				options
			);
		},
		render: function render() {
			var countPicker = this;
			var props = {
				className: 'KittenCountPicker'
			};
			var sizeOptions = countPicker.getSizeOptions();
			var limitedKittenList = countPicker.props.data.slice();
			limitedKittenList.length = countPicker.state.count;
			return React.createElement(
				'div',
				props,
				sizeOptions,
				React.createElement(KittenPicker, { data: limitedKittenList })
			);
		}
	});
	
	ReactDOM.render(React.createElement(KittenCountPicker, { data: kittenProductList }), document.getElementById('example-children_change'));

/***/ }
/******/ ]);
//# sourceMappingURL=examples.js.map