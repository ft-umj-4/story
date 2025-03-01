import markdownItTableWrap from 'markdown-it-table-wrap';
import MarkdownIt from 'markdown-it';
import util from 'node:util';

import { minifyHtml } from './lib/transforms/minifyHtml';
import { readableDate } from './lib/filters/readableDate';
import { minifyJs } from './lib/filters/minifyJs';
import { posts } from './lib/collections/posts';
import { tagList } from './lib/collections/tagList';
import { pagedPostByTag } from './lib/collections/pagedPostsByTag';
import { pagedPost } from './lib/collections/pagedPosts';

export default function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.setLibrary('md', MarkdownIt(options));
  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(markdownItTableWrap));

  // Copy images
  eleventyConfig.addPassthroughCopy('src/assets/img/**/*');
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
  eleventyConfig.addFilter('head', (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Return the keys used in an object
  eleventyConfig.addFilter('getKeys', (target) => {
    return Object.keys(target);
  });

  eleventyConfig.addFilter('filterTagList', function filterTagList(tags) {
    return (tags || []).filter((tag) => ['all', 'posts'].indexOf(tag) === -1);
  });

  eleventyConfig.addFilter('sortAlphabetically', (strings) =>
    (strings || []).sort((b, a) => b.localeCompare(a))
  );

  eleventyConfig.addFilter('readableDate', readableDate);
  eleventyConfig.addAsyncFilter('minifyJs', minifyJs);

  eleventyConfig.addTransform('minifyHtml', minifyHtml);

  eleventyConfig.addCollection('posts', posts);
  eleventyConfig.addCollection('tagList', tagList);
  eleventyConfig.addCollection('pagedPosts', pagedPost);
  eleventyConfig.addCollection('pagedPostsByTag', pagedPostByTag);

  eleventyConfig.addShortcode('currentBuildDate', () => {
    return new Date().toISOString();
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
}
