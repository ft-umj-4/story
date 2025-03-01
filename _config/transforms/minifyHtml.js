import { minify } from 'html-minifier';

export function minifyHtml(content, outputPath) {
  if (process.env.NODE_ENV === 'production' && outputPath.endsWith('.html')) {
    return minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
  }

  return content;
}
