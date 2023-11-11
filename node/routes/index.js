const hotelRoutes = require('./hotel');
const userRoutes = require('./user');
const transactionRoutes = require('./transaction');
const adminRoutes = require('./admin');
const searchRoutes = require('./search');


function route(app) {
  app.use('/search', searchRoutes)
  app.use('/admin', adminRoutes)
  app.use('/transaction', transactionRoutes);
  app.use('/user', userRoutes);
  app.use('/hotel', hotelRoutes);

}

module.exports = route;
