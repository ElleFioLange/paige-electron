const testJson = [
  {
    name: 'a',
    fav: false,
    children: [
      { name: 'b', fav: false, ext: 'pdf' },
      { name: 'c', fav: true, ext: 'doc' },
      { name: 'd', fav: true, ext: 'pdf' },
      {
        name: 'e',
        fav: true,
        children: [
          { name: 'f', fav: false, ext: 'pptx' },
          { name: 'g', fav: false, ext: 'txt' },
        ],
      },
    ],
  },
  { name: 'h', fav: true, ext: 'pdf' },
  {
    name: 'i',
    fav: false,
    children: [
      { name: 'j', fav: false, ext: 'pdf' },
      { name: 'k', fav: false, children: [] },
    ],
  },
];

console.log(typeof testJson);
