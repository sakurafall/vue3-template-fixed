// 1. 直接用

// 2. 代码逻辑判断
// import.meta.env.PROD 生产环境
// import.meta.env.DEV  开发环境
// import.meta.env.SSR  服务器渲染(serve side render)

// 3. 通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_URL)

let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = ''
} else {
  // 开发环境
  BASE_URL = ''
}

export const TIME_OUT = 10000
export { BASE_URL }
