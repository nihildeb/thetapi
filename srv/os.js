module.exports = function (app) {
  app.get('/os', (req, res) => {
    // console.log(__dirname)
    // console.dir(app)
    res.send('asd')
  })
}
// module.exports = {
// method: 'get',
// path: '/',
// fn: (req, res) => {
// res.send('os hello')
// }
// }
