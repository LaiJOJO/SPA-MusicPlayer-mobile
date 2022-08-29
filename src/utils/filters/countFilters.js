function filters(count) {
  if (count >= 10000) {
    return count = (count / 10000).toFixed(1) + '万'
  } else if (count >= 100000000) {
    return count = (count / 100000000).toFixed(1) + '亿'
  }
  return count
}
export default filters