let baseUrl = ""
if (process.env.NODE_ENV === 'development') {
	console.log("-------development--------, ",'development');
	baseUrl = 'http://www.jifeng.online:8872'  // 开发环境
} else {
	console.log("-------prod--------, ","prod");
	baseUrl = 'https://sweb.jjdzmall.com' // 生产环境
}

export default baseUrl
