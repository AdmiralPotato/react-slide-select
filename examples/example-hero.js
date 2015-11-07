var heroList = ['Grumpy Cat', 'Hover Cat'];
ReactDOM.render(
	React.createElement(
		SlideSelect,
		{
			type: 'HeroSlide',
			items: heroList
		}
	),
	document.getElementById('example-hero')
);