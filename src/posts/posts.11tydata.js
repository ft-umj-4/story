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
        data.title.toLowerCase().includes('tunggakan')
      ) {
        return randomChoice([
          `/assets/img/pexels-nicola-barts-7927424.jpg`
        ]);
      } else if (
        data.title.toLowerCase().includes('rincian pengeluaran')
      ) {
        return randomChoice([
          `/assets/img/pexels-ron-lach-10365936.jpg`
        ]);
      } else if (
        data.title.toLowerCase().includes('laporan arisan jilid 02')
      ) {
        return randomChoice([
          `/assets/img/pexels-goumbik-590016.jpg`
        ]);
      } else if (
        data.title.toLowerCase().includes('laporan')
      ) {
        return randomChoice([
          `/assets/img/pexels-asphotograpy-95916.jpg`
        ]);
      } else if (data.title.toLowerCase().includes('daftar anggota')) {
        return randomChoice([`/assets/img/pexels-jibarofoto-2014773.jpg`]);
      }

      return randomChoice([`/assets/img/pexels-steve-1109354.jpg`]);
    },
  },
};
