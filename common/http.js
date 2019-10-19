const domain = "https://fruit.goio.xyz"
import store from "../store"
var http = {
	post: function(obj, callback) {
		obj.method = 'POST'
		this.then(obj, callback)
	},
	get: function(obj, callback) {
		obj.method = 'GET'
		this.then(obj, callback)
	},
	upload: function(obj, callback) {
		if (!obj.header) {
			obj.header = {}
		}
		obj.header['Content-Type'] = 'multipart/form-data'
		obj.header['accept'] = 'application/json'

		var token = wx.getStorageSync('token')
		if (token) {
			obj.header['Authorization'] = 'Bearer ' + token
		}

		if (obj.url.indexOf('http') !== 0) {
			obj.url = domain + obj.url
		}

		wx.uploadFile({
			url: obj.url,
			filePath: obj.file,
			formData: obj.data,
			name: 'file',
			header: obj.header,
			success: function(res) {
				if (res.statusCode == 200) {
					callback(JSON.parse(res.data))
				} else {
					wx.showToast({
						icon: 'none',
						title: '服务器忙，请稍后再试(' + res.statusCode + ')'
					})
				}
			}
		})
	},
	then: function(obj, callback) {

		var token = wx.getStorageSync('token')
		if (token) {
			if (obj.header) {
				obj.header.Authorization = 'Bearer ' + token
			} else {
				obj.header = {
					Authorization: 'Bearer ' + token
				}
			}
		}
		if (obj.url.indexOf('http') !== 0) {
			obj.url = domain + obj.url
		}

		obj.loading && uni.showLoading({
			title: '加载中'
		})
		wx.request({
			url: obj.url,
			data: obj.data,
			header: obj.header,
			method: obj.method,
			success: function(res) {
				obj.loading && uni.hideLoading()
				if (res.statusCode == 200) {
					if (res.data.code == 401) {
						uni.showToast({
							icon:"none",
							title:"请退出后,重新加载小程序"
						})
						uni.removeStorageSync('token');
						
					} else {
						callback(res.data)
					}
				} else {
					wx.showToast({
						icon: 'none',
						title: '服务器忙，请稍后再试(' + res.statusCode + ')'
					})
				}
			},
			fail: function(res) {
				obj.loading && uni.hideLoading()
				wx.showToast({
					icon: 'none',
					title: '网络故障，请检查手机网络'
				})
			}
		})
	}
}

module.exports = http
