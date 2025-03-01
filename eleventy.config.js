import markdownItTableWrap from 'markdown-it-table-wrap';
import MarkdownIt from 'markdown-it';

import minifyHtml from './_config/transforms/minifyHtml';
import filterPlugin from './_config/filters/filterPlugin';

import posts from './_config/collections/posts';
import tagList from './_config/collections/tagList';
import pagedPostByTag from './_config/collections/pagedPostsByTag';
import pagedPost from './_config/collections/pagedPosts';

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

  eleventyConfig.addCollection('posts', posts);
  eleventyConfig.addCollection('tagList', tagList);
  eleventyConfig.addCollection('pagedPosts', pagedPost);
  eleventyConfig.addCollection('pagedPostsByTag', pagedPostByTag);

  eleventyConfig.addPlugin(filterPlugin);

  eleventyConfig.addTransform('minifyHtml', minifyHtml);

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
