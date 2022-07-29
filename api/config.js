let baseUrl = ""
if (process.env.NODE_ENV === 'development') {
	baseUrl = 'https://sweb-sit.jjdzmall.com'  // 开发环境
} else {
	baseUrl = 'https://jsonplaceholder.typicode.com' // 生产环境
}
export default baseUrl
