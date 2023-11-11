const Transaction = require('../models/transaction')

exports.createTransaction = async (req, res, next) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.json({ message: 'oke' })
  } catch (err) {
    res.status(400).json({ message: 'Has error' })
  }

};
exports.getTransaction = async (req, res, next) => {
  try {
    //thời gian hiện tại
    const now = new Date()
    const now1 = `${now.getFullYear()}/${now.getMonth()}/${now.getDate()}`
    const dateNow = new Date(now1)
    const username = req.params.username
    const transaction = await Transaction.find({ user: username });
    if (transaction) {
      for (const key in transaction) {
        const a = transaction[key].dateStart
        const b = transaction[key].dateEnd
        let start = new Date(`${a.getFullYear()}/${a.getMonth()}/${a.getDate()}`)
        let end = new Date(`${b.getFullYear()}/${b.getMonth()}/${b.getDate()}`)
        if (dateNow >= start && dateNow < end) {
          transaction[key].status = 'Checkin'
        }
        if (dateNow >= end) {
          transaction[key].status = 'Checkout'
        }
      }
      res.json(transaction)
    } else {
      throw new Error()
    }
  } catch (err) {
    res.status(400).json({ message: 'Has error' })
  }
};
