/*
Search for posts with keyword given in the parameter "q"
Only run on search page ("/search/")
*/

// https://github.com/sindresorhus/p-debounce
function debounce(fn, wait) {
  let timer;
  let resolveList = [];

  return function(...arguments_) {
    return new Promise((resolve) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        timer = null;

        const result = fn.apply(this, arguments_);

        for (resolve of resolveList) {
          resolve(result);
        }

        resolveList = [];
      }, wait);

      resolveList.push(resolve);
    });
  };
}

class SearchPosts {
  async init() {
    const params = new URL(location.href).searchParams;

    this.start = Number(params.get('start')) || 1;
    this.size = Number(params.get('size')) || 12;

    this.posts = await fetch('../index.json').then((res) => {
      return res.json();
    });

    this.render(params.get('q'));
  }

  render(query) {
    const wrapperEl = document.getElementById('wrapper');
    const searchBoxEl = document.getElementById('searchbox');
    const infoEl = document.getElementById('info');

    query = typeof query === 'string' ? query.toLowerCase() : '';

    history.replaceState(null, null, `?q=${query}&start=${this.start}&size=${this.size}`);

    searchBoxEl.value = query;
    wrapperEl.innerHTML = '';

    if (query === '') {
      infoEl.textContent = 'Enter keywords in the search box above!';

      return;
    }

    const matchedPosts = this.posts.filter((post) => {
      const postTitle = post.title.toLowerCase();

      return postTitle.indexOf(query) !== -1;
    });

    if (matchedPosts.length === 0) {
      infoEl.textContent = `No results were found for "${query}"`;

      return;
    }

    const size = this.size;
    const offset = this.start - 1;
    const slicedPosts = matchedPosts.slice(offset, offset + size);

    const lastPostIndex = offset + slicedPosts.length;
    const showingRange = this.start < lastPostIndex || this.start !== 1 ? `${this.start} to ${lastPostIndex}` : this.start;
    const extraS = matchedPosts.length > 1 ? 's' : '';

    infoEl.textContent = `Showing ${showingRange} of ${matchedPosts.length} result${extraS} found for keyword "${query}".`;

    slicedPosts.forEach((post) => {
      const { url, title, date, description, tags, thumb } = post;

      wrapperEl.innerHTML += `
        <div class="w-full sm:w-1/2 md:w-1/3 self-stretch p-2 mb-2 post-card group">
          <div
            class="rounded-lg shadow-md h-full bg-white dark:bg-gray-900 dark:border dark:border-slate-700"
          >
            <a
              href="${url}"
              class="bg-center bg-cover block group h-fit overflow-clip rounded-t-lg w-fit aspect-[1.75]"
            >
              <img
                class="w-full m-0 rounded-t-lg lazy card-thumbnail duration-300 group-hover:scale-110 h-[inherit] max-h-[inherit] object-center rounded-[inherit] transition-all"
                src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%201%201'%20height%3D'500'%20width%3D'960'%20style%3D'background-color%3Argb(203%2C213%2C224)'%2F%3E"
                data-src="${thumb}"
                width="960"
                height="500"
                alt="${title}"
              />
            </a>
            <div class="px-6 py-5 space-y-4">
              <div class="font-semibold text-xl">
                <a
                  class="text-slate-900 dark:text-slate-200 font-serif hover:text-teal-700 dark:hover:text-teal-600"
                  href="${url}"
                  >${title}</a
                >
              </div>
              <div class="flex items-center gap-4">
                <p class="text-xs text-slate-400" title="Published date">
                ${date}
                </p>

                <div class="text-center">
                  <a
                    href="/story/tags/${tags[0]}"
                    class="inline-block bg-slate-200 rounded-full px-2 py-1 text-xs font-medium text-slate-700 hover:underline"
                    >#${tags[0]}</a
                  >
                </div>

              </div>
              <p class="text-sm text-slate-600 dark:text-slate-400 font-light">
                ${description.substring(0, 90)}
              </p>
            </div>
          </div>
        </div>
      `;
    });

    if (window.setupLazyImage) {
      window.setupLazyImage();
    }
  }
}

// NOTE: Need to match with pathPrefix
if (location.pathname === '/story/search/') {
  const searchBoxEl = document.getElementById('searchbox');
  const searchPosts = new SearchPosts();

  searchPosts.init();

  searchBoxEl.addEventListener('keyup', debounce(function() {
    searchPosts.render(this.value);
  }, 400));
}

