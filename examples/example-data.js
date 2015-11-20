var kittenProductList = [
	{
		photoId: '8043720291',
		name: 'Rainbow Kitten'
	},
	{
		photoId: '14825637417',
		name: 'Dreamer Kitten'
	},
	{
		photoId: '9035469865',
		name: 'Organic Grass-fed Kitten'
	},
	{
		photoId: '14133914169',
		name: 'Towel Kitten'
	},
	{
		photoId: '3528540033',
		name: 'Turquoise Kitten'
	},
	{
		photoId: '13606574515',
		name: 'Ecstatic Kitten'
	},
	{
		photoId: '6197993697',
		name: 'Secret Kitten'
	},
	{
		photoId: '7837150408',
		name: 'Sad Dust Bunny Kitten'
	}
];

var imageDataHandler = function(item, photoInfo) {
	var photo = photoInfo.photo;
	var imageBase = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret;
	item.image = imageBase + '_q.jpg';
	item.large = imageBase + '_b.jpg';
};

var imageDataProvider = function(item) {
	var apiKey = 'e5535a9fef9cea5d964b5821e5f8c8f9';
	var baseDataURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + apiKey
	var photoId = item.photoId;
	var curryName = 'curry_' + photoId;
	var callbackName = 'imageDataHandler.' + curryName;
	var dataParams = '&photo_id=' + photoId + '&format=json&jsoncallback=' + callbackName;
	imageDataHandler[curryName] = function(photoInfo) {
		imageDataHandler(item, photoInfo);
	};
	return baseDataURL + dataParams;
};
var thisIsDirtyAndIDontLikeItButIWillNotWasteTimeOnHandlingMyOwnAjaxRightNow = function() {
	kittenProductList.forEach(function(item) {
		var scriptURL = imageDataProvider(item);
		document.write('<script src="' + scriptURL + '"></script>');
	});
};
thisIsDirtyAndIDontLikeItButIWillNotWasteTimeOnHandlingMyOwnAjaxRightNow();
