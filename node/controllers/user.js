const User = require('../models/user');

exports.addUser = async (req, res, next) => {
  let errs
  let user
  //kiểm tra xem username cótonf tại hay chưa
  const exist = await User.findOne({ username: req.body.username });
  try {
    user = new User(req.body);
    //valid input
    await user.validate();
  } catch (err) {
    errs = err.errors
  }
  //is it oke ? 
  if (!errs && !exist) {
    await user.save();
    res.json({ message: 'oke' })
  } else {
    if (exist)
      errs = {
        ...errs,
        username: 'username already exist'
      }
    res.status(400).json({ message: errs })

  }
}

exports.login = async (req, res, next) => {

  const user = await User.findOne({ username: req.body.username, password: req.body.password });
  if (user) {
    res.json({
      isLogin: true,
      user
    })
  } else {
    res.status(404).json({ isLogin: false })
  }
}
