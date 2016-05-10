var React = require('react');
var ReactDOM = require('react-dom');
var KittenHeroList = require('./example-hero.jsx');
var KittenPicker = require('./example-custom_children.jsx');

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

var SetIndexKitten = React.createClass({
  getInitialState(){
    return {
      count: 0
    }
  },
  getDefaultProps(){
    return {data: []};
  },
  change(syntheticChangeEvent){
    this.setState({
      count: syntheticChangeEvent.target.value
    });
    var number = parseInt(syntheticChangeEvent.target.value, 10);
    this.handleSelect(number);
  },
  getSizeOptions(){
    var allKittens = this.props.data;
    var options = allKittens.map((item, index) => {
      return <option key={`setindex-option-${index}`} value={index}>{index}</option>;
      });
      return (
        <select className="form-control" value={this.state.count} onChange={this.change}>
          {options}
        </select>
      )
    },
    handleSelect(index){
      this.refs["setIndexList"].setIndex(index);
    },
    render(){
      var options = this.getSizeOptions();
      var props = this.props;
      var heroList = props.data.map((item, index) => {
        var itemProps = {
          key: 'setindex-hero-' + index,
          data: item
        };
        return (<KittenHero {...itemProps} />);
      });
      return (
        <div className="KittenHeroList">
          <p>
          {options}
          </p>
          <SlideSelect {...{
              ref: 'setIndexList',
              showDots: true,
              showArrows: true,
              fullWidth: true
            }}>
            {heroList}
          </SlideSelect>
        </div>
      )
    }
  });

  ReactDOM.render(
    <SetIndexKitten data={kittenProductList}/>,
    document.getElementById('example-fullwidth_setIndex')
  );
