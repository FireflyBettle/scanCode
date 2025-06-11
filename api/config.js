let baseUrl = ""
if (process.env.NODE_ENV === 'development') {
	console.log("-------development--------, ",'development');
	baseUrl = 'https://test.qflmqft.com:8080'  // 开发环境
} else {
	console.log("-------prod--------, ","prod");
	baseUrl = 'https://www.qflmqft.com:8080' // 生产环境
}

export default baseUrl
