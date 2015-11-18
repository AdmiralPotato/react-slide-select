var heroList = ['Grumpy Cat', 'Hover Cat', 'Bread Cat', 'Business Cat', 'Hipster Cat', 'Lime Cat', 'Mellow Cat', 'Rainbow Cat', 'Dreamer Cat', 'Secret Cat', 'Turbo Cat', 'Ultra Cat', 'Fancy Cat', 'Dancy Cat', 'Prancy Cat'];

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
