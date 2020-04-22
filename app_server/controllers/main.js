/* GET home page. */
const index = (req, res) => {
  res.render('index', {
    title: 'The New Express'
  });
};
module.exports = {
  index
};
