var ROOT_URL = 'https://ft-umj-4.github.io/story';

$('.article__content>img').each(function(){
	var firstSrc = 	$(this).attr('src');

    $(this).attr('src', ROOT_URL + firstSrc);
});