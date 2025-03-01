function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default {
  layout: 'post',
  title: 'Untitled',
  eleventyComputed: {
    permalink: (data) => `${data.page.fileSlug}/index.html`,
    thumb: (data) => {
      if (data.thumb) {
        if (data.thumb.search(/^https?:\/\//) !== -1) {
          return data.thumb;
        }
        return `/assets/img/${data.thumb}`;
      } else if (
        data.title.includes('Laporan') ||
        data.title.includes('Rincian Pengeluaran')
      ) {
        return randomChoice([
          `/assets/img/pexels-goumbik-590016.jpg`,
          `/assets/img/pexels-asphotograpy-95916.jpg`,
        ]);
      } else if (data.title.includes('Daftar Anggota')) {
        return randomChoice([`/assets/img/pexels-jibarofoto-2014773.jpg`]);
      }

      return randomChoice([`/assets/img/pexels-steve-1109354.jpg`]);
    },
  },
};
