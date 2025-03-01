import util from 'node:util';
import { minify } from 'terser';

import dayjs from 'dayjs';

export default async function (eleventyConfig, pluginOptions) {
  eleventyConfig.addFilter('readableDate', function (date) {
    return dayjs(date).format('D MMMM YYYY');
  });

  eleventyConfig.addAsyncFilter('minifyJs', async function (code) {
    if (process.env.NODE_ENV === 'production') {
      const minified = await minify(code);

      if (minified.error) {
        console.error('Terser error: ', minified.error);

        return code;
      }

      return minified.code;
    }

    return code;
  });

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
}
