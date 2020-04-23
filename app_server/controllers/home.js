// GET Home page
const index = (req, res) => {
  res.render('index', {
    title: 'The New Express',
    body: '<p>Sit labore ut irure adipisicing est sint incididunt voluptate irure velit aliquip duis. Tempor quis ad veniam do nostrud id irure ipsum. Ullamco nisi tempor exercitation do pariatur amet labore. Quis voluptate elit esse officia consectetur magna culpa adipisicing in pariatur adipisicing anim. Id dolore ad ea veniam. Amet ipsum tempor adipisicing in commodo Lorem commodo do minim sint mollit nostrud.</p><p>Do sunt mollit in ipsum excepteur adipisicing minim magna deserunt ullamco laboris anim. Sint anim voluptate fugiat laboris labore quis mollit nostrud laborum adipisicing nisi. Occaecat laboris tempor amet exercitation aliquip voluptate cupidatat do. Laborum magna incididunt est consequat cupidatat ea aliqua. Quis nisi tempor qui veniam do velit amet ex. Anim minim consectetur et elit cupidatat nulla quis consequat dolor duis duis cupidatat aliquip qui. Nulla ut laboris incididunt aliqua commodo ea quis aliqua aliquip magna cupidatat sunt ea laborum.</p><p>Enim id reprehenderit dolore esse sit excepteur non aliqua est. Voluptate eiusmod ut sunt eu. Mollit sint aute eu qui deserunt ipsum culpa eu anim eu.</p>'
  });
};

// Export
module.exports = { index };
