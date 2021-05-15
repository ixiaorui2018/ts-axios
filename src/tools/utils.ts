const toString = Object.prototype.toString

// 判断数据类型是否是 Date 对象
export function isDate(value: any): value is Date {
  return toString.call(value) === '[Object Date]'
}

// 判断数据类型是否是对象
// export function isObject(value: any): value is Object {
//   return value != null && typeof value === 'object'
// }

// 判断数据类型是否是普通对象
export function isPlainObject(value: any): value is Object {
  return value != null && toString.call(value) === '[object Object]'
}
