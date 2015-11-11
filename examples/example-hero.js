var heroList = ['Grumpy Cat', 'Hover Cat', 'Bread Cat', 'Business Cat', 'Hipster Cat', 'Lime Cat', 'Mellow Cat'];

ReactDOM.render(
	React.createElement(
		SlideSelect,
		{
			type: 'hero',
			items: heroList,
			showDots: true,
			showArrows: true,
			fullWidth: true
		}
	),
	document.getElementById('example-hero')
);
