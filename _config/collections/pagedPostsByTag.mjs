import siteData from '../../src/_data/site.mjs';
import tagList from './tagList.mjs';

export default function (coll) {
  const allTagList = tagList(coll);

  const maxPostsPerPage = siteData.paginateTags;
  const pagedPosts = [];

  Object.keys(allTagList).forEach((tagName) => {
    const taggedPosts = [...coll.getFilteredByTag(tagName)].reverse();
    const numberOfPages = Math.ceil(taggedPosts.length / maxPostsPerPage);

    for (let pageNum = 1; pageNum <= numberOfPages; pageNum++) {
      const sliceFrom = (pageNum - 1) * maxPostsPerPage;
      const sliceTo = sliceFrom + maxPostsPerPage;

      pagedPosts.push({
        tagName,
        number: pageNum,
        posts: taggedPosts.slice(sliceFrom, sliceTo),
        first: pageNum === 1,
        last: pageNum === numberOfPages,
      });
    }
  });

  return pagedPosts;
}
