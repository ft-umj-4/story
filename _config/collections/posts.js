export function posts(coll) {
  const posts = [...coll.getFilteredByGlob('src/posts/**/*.md')];

  return posts.reverse();
};
