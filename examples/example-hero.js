var heroList = ['Grumpy Cat', 'Hover Cat', 'Bread Cat', 'Business Cat'];
ReactDOM.render(
	React.createElement(
		SlideSelect,
		{
			type: 'HeroSlide',
			items: heroList,
			showDots: true
		}
	),
	document.getElementById('example-hero')
);
