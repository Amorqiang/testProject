// 手机号验证
export function isvalidPhone(str) {
  const reg = /^1[2|3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}
//邮箱号验证
export function isvalidEmail(str) {
  const reg =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  return reg.test(str)
}
//非负数
export function isvalidNum(str) {
  const reg = /^\d+(\.\d+)?$/
  return reg.test(str)
}
