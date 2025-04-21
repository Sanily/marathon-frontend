export const getQuery = (url) => {
  // str为？之后参数字符串
  const str = url.substr(url.indexOf('?') + 1)
  // arr每个元素都是完整的参数键值
  const arr = str.split('&')
  // result为存储参数键值的集合
  const result = {} as any
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].split('=')
    // item的两个元素分别是参数名和参数值
    result[item[0]] = item[1]
  }
  return result
}
