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

// 混合对象实现方法
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 深度合并方法
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const value = obj[key]
        if (isPlainObject(value)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], value)
          } else {
            result[key] = deepMerge({}, value)
          }
        } else {
          result[key] = value
        }
      })
    }
  })

  return result
}

// 判断是否为表单数据
export function isFormData(val: any): boolean {
  return typeof val !== 'undefined' && val instanceof FormData
}
