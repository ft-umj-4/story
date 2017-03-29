
$(window).on('load', function(){   
   	$('.article__content>img').each(function(){
		var firstSrc = 	$(this).attr('src');
		if(!ROOT_URL){
			ROOT_URL = 'https://ft-umj-4.github.io/story';
		}
	    $(this).attr('src', ROOT_URL + firstSrc);
	});
});
