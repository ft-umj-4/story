const markdownIt = require('markdown-it');
const markdownItTableWrap = require('markdown-it-table-wrap').default;
const util = require('util');

module.exports = function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.setLibrary('md', markdownIt(options));
  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(markdownItTableWrap));

  eleventyConfig.addPassthroughCopy('src/assets/img/**/*');

  // Copy images inside posts
  eleventyConfig.addPassthroughCopy({ 'src/posts/**/img/*': 'assets/img/' });

  eleventyConfig.addPassthroughCopy({ 'src/posts/**/*.jpeg': 'assets/img/' });
  eleventyConfig.addPassthroughCopy({ 'src/posts/**/*.jpg': 'assets/img/' });
  eleventyConfig.addPassthroughCopy({ 'src/posts/**/*.png': 'assets/img/' });

  eleventyConfig.addWatchTarget('src/assets/js/');

  eleventyConfig.addLayoutAlias('default', 'layouts/default.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  eleventyConfig.addFilter('console', function (value) {
    const str = util.inspect(value);
    return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`;
  });

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);

  eleventyConfig.addFilter(
    'readableDate',
    require('./lib/filters/readableDate')
  );
  eleventyConfig.addFilter('minifyJs', require('./lib/filters/minifyJs'));

  eleventyConfig.addTransform(
    'minifyHtml',
    require('./lib/transforms/minifyHtml')
  );

  eleventyConfig.addCollection('posts', require('./lib/collections/posts'));
  eleventyConfig.addCollection('tagList', require('./lib/collections/tagList'));
  eleventyConfig.addCollection(
    'pagedPosts',
    require('./lib/collections/pagedPosts')
  );
  eleventyConfig.addCollection(
    'pagedPostsByTag',
    require('./lib/collections/pagedPostsByTag')
  );

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    pathPrefix: '/story/',
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
