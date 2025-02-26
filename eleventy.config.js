const markdownIt = require('markdown-it');
const UpgradeHelper = require('@11ty/eleventy-upgrade-help');
const markdownItTableWrap = require('markdown-it-table-wrap').default;

module.exports = function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.setLibrary('md', markdownIt(options));
  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(markdownItTableWrap));

  // If you have other `addPlugin` calls, UpgradeHelper should be listed last.
  eleventyConfig.addPlugin(UpgradeHelper);

  eleventyConfig.addPassthroughCopy('src/assets/img/**/*');

  // Copy images inside posts
  eleventyConfig.addPassthroughCopy({ 'src/posts/**/img/*': 'assets/img/' });

  eleventyConfig.addPassthroughCopy({ 'src/posts/**/*.jpeg': 'assets/img/' });
  eleventyConfig.addPassthroughCopy({ 'src/posts/**/*.jpg': 'assets/img/' });
  eleventyConfig.addPassthroughCopy({ 'src/posts/**/*.png': 'assets/img/' });

  eleventyConfig.addWatchTarget('src/assets/js/');

  eleventyConfig.addLayoutAlias('default', 'layouts/default.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

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
