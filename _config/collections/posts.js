export default function (coll) {
  const posts = [...coll.getFilteredByGlob('src/posts/**/*.md')];

  return posts.reverse();
}
