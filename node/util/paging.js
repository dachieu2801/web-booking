module.exports = (data, perPage, page) => {
  perPage; // số lượng sản phẩm xuất hiện trên 1 page
  page
  // movies hiển thị
  let dataRender = []

  for (let i = 0; i <= 30; i++) {
    dataRender.push(data[(perPage * page) - perPage + i])
    if (dataRender.length === perPage) {
      break
    }
    if ((perPage * page) - perPage + i >= data.length - 1) {
      break
    }
  }

  return dataRender
}