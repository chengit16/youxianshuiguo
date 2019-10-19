import Vue from 'vue'
import Vuex from 'vuex'
import $http from '../common/http.js'
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// 服务器地址
		defaultUrl: "https://fruit.goio.xyz",
		// 激活的分类菜单
		activeCate: 0,
		// 商品列表 
		goodslist: [],
		// 新订单
		newBalance: [],
		// 用户信息
		user: {},
		code: "",
		token: "",
		logined: false,
		//购物车
		cartlist: {
			enable: [],
			disable: []
		},
		// 购物车数量
		cartlistNum: 0,
		// 选中的购物车商品
		cartSelectList: [],
		// 地址列表
		addrList: [],
		// 当前的地址详情
		addr: {
			name: "",
			phone: "",
			region: "",
			province: "",
			cityName: "",
			countyName: "",
			addr: "",
			nationalCode: "",
			telNumber: ""
		},
		// 积分
		point:"",
		pointList:[],
		currentPoint:0,
		// 优惠券
		coupon:"",
		couponList:[],
		// 选中的优惠券
		currentCoupon:{},
		currentCouponPrice:0,
		currentPrice:0
	},
	getters: {
		cartlistlen(state) {
			return state.cartlist.length
		}
	},
	mutations: {
		setCode(state, data) {
			state.code = data
		},
		setToken(state, data) {
			state.token = data
		},
		setLogined(state, data) {
			state.logined = data
		},

		// 商品左侧激活index
		updateActiveCate(state, data) {
			state.activeCate = data
		},
		
		// 设置购物车选中
		setCartSelect(state, data) {
			state.cartSelectList.push(data)
		},
		// 删除购物车选中
		delCartSelect(state, data) {
			let i;
			state.cartSelectList.forEach((item, index) => {
				if (item.id == data.id) {
					i = index;
				}
			})
			state.cartSelectList.splice(i, 1)
		},
		// 更新商品数据
		updateGoodslist(state, data) {
			const _t = this;
			$http.get({
				url: `/mini/cate/`,
				loading: true
			}, function(res) {
				if (res.code == 0) {
					state.goodslist = []
					res.data.forEach(classify => {
						classify.product.forEach(item => {
							item.num = 0;
						})
					})
					state.goodslist.push(...res.data)
					_t.commit("getCart")
				}
			})
		},
		// 添加到购物车
		addToCart(state, data) {
			$http.post({
				url: "/mini/cart/add/",
				data: data,
				loading: true
			}, (res) => {
				uni.hideLoading();
				if (res.code == 0) {
					this.commit("getCart")
				} else if (res.code == 40405) {
					uni.showToast({
						title: "添加失败,请稍后重试",
						icon: "none"
					})
				}
			})
		},
		// 购物车加
		doPlus(state, data) {
			$http.post({
				url: "/mini/cart/plus/",
				data: data,
				loading: true
			}, (res) => {
				uni.hideLoading();
				if (res.code == 0) {
					this.commit("getCart")
				} else {

				}
			})
		},
		// 购物车减
		doMinus(state, data) {
			$http.post({
				url: "/mini/cart/minus/",
				data: data,
				loading: true
			}, (res) => {
				if (res.code == 0) {
					this.commit("getCart")
				} else {

				}
			})
		},
		// 购物车商品删除
		delFromCart(state, data) {
			$http.post({
				url: "/mini/cart/del/",
				data: data,
				loading: true
			}, (res) => {
				if (res.code == 0) {
					this.commit("getCart")
					state.goodslist.forEach(good => {
						good.product.forEach(product => {
							if (data.id == product.id) {
								product.num = 0
							}
						})
					})
				} else {

				}
			})
		},
		// 获取购物车列表
		getCart(state) {
			
			$http.post({
				url: "/mini/cart/"
			}, (res) => {
				if (res.code == 0) {
					state.cartlist = Object.assign({}, state.cartlist);
					state.cartlist = Object.assign(state.cartlist, res.data);
					const enable = res.data.enable;
					const disable = res.data.disable;
					// 更新购物车数量 == 商品列表数量
					disable.forEach(item => {
						item.product.num = item.num;
					})

					enable.forEach(item => {
						Vue.set(item, 'isSelect', true)
						item.product.num = item.num;
						state.goodslist.forEach(good => {
							good.product.forEach(product => {
								if (item.pid == product.id) {
									product.num = item.num
								}
							})
						})
					})
					if (state.cartSelectList.length) {
						state.cartSelectList.forEach(noselect => {
							enable.forEach(item => {
								if (noselect.id == item.id) {
									item.isSelect = noselect.isSelect;
								}
							})
						})
					}
					this.commit('getCartNum')
				} else {
					uni.showToast({
						title: "获取购物车列表失败"
					})
				}
			})
		},
		// 获取购物车商品数量
		getCartNum() {
			$http.post({
				url: "/mini/cart/num/"
			}, (res) => {
				if (res.code == 0) {
					
					if(res.data*1 > 0){
						uni.setTabBarBadge({
						  index: 2,
						  text: res.data + ""
						})
					}
				} else {
					uni.showToast({
						title: "获取购物车列表失败"
					})
				}
			})
		},
		// 更新商品数量
		// 增加数量
		changeGoodCount(state, data) {
			let {
				item,
				t
			} = data;
			// item 为商品  t true + / false -
			if (t) {
				// 购物车没有
				if (item.num == 0) {
					this.commit("addToCart", {
						id: item.id,
						num: 1,
						price: item.price
					})
				} else {
					this.commit("doPlus", {
						id: item.id,
						num: 1
					})
				}
			} else {
				// 购物车就剩一个了
				if (item.num == 1) {
					this.commit("delFromCart", {
						id: item.id
					})
				} else {
					this.commit("doMinus", {
						id: item.id
					})
				}
			}

		},
		
		// 创建新订单
		createNewBalance(state, data) {
			state.newBalance = []
			if (data.length) {
				let tmp = {}
				data.forEach(item => {
					tmp = JSON.parse(JSON.stringify(item))
					tmp.plan = new Array(0, 0, 0, 0, 0, 0, 0)
					tmp.range = new Array()
					state.newBalance.push(tmp)
				})

				state.newBalance.forEach(item => {
					let total = item.num;
					for (let i = 0; i < total + 1; i++) {
						item.range.push(i)
					}
					while (total > 0) {
						for (let i = 0; i < 7; i++) {
							if (total == 0) {
								return
							}
							total -= 1;
							item.plan[i] += 1;
						}
					}
				})
			}
		},
		// 获取地址列表
		getAddrList(state) {
			const _t = this;
			state.addr = Object.assign({}, state.addr);
			$http.post({
				url: "/mini/user/addr/",
			}, (res) => {
				if (res.code == 0) {
					state.addrList = []
					state.addrList.push(...res.data)
					if (!state.addr.name) {
						let flag = true;
						res.data.forEach(item => {
							if (item.isDefault == "1") {
								flag = false;
								state.addr = Object.assign(state.addr, item);
							}
						})
						if(flag){
							state.addr = Object.assign(state.addr, res.data[0]);
						}
						console.log(state.addr)
					}
					
				}
			})
		},
		// 更新选中的地址
		updateCurrtAddr(state, data) {
			state.addr = Object.assign({}, state.addr);
			state.addr = Object.assign(state.addr, data);
		},
		// 清除选中的地址
		cleanCurrtAddr(state,data){
			for(let k of Object.keys(state.addr)){
			    Vue.set(state.addr,k,"");
			}
		},
		getUser(state){
			const _t = this;
			$http.post({url:"/mini/user/info/"},(res)=>{
				if(res.code == 0){
					if(res.data.nick || res.data.avatar){
						_t.commit("setLogined",true)
						_t.commit("setUser",Object.assign(res.data,{
									nickName:res.data.nick,
									avatarUrl:res.data.avatar
								}
							))
						_t.commit("getCoupon")
					}
				}
			})
		},
		// 设置用户信息
		setUser(state, data) {
			state.user = Object.assign({}, state.user);
			state.user = Object.assign(state.user, data);
		},
		// 获取优惠券信息
		getCoupon(state){
			const _t = this;
			$http.post({
				url:"/mini/coupon/",
			},res => {
				if(res.code == 0){
					state.couponList = [];
					state.couponList.push(...res.data);
					state.coupon = state.couponList.length;
				}
			})
		},
		setCurrentPoint(state,data){
			state.currentPoint = data
		},
		setCurrentPrice(state,data){
			state.currentPrice = data
		},
		setCurrentCouponPrice(state,data){
			state.currentCouponPrice = data
		},
		// 
		setCurrentCoupon(state, data) {
			state.currentCoupon = Object.assign({}, state.currentCoupon);
			state.currentCoupon = Object.assign(state.currentCoupon, data);
		},
		clearCurrentCoupon(state){
			for(let k of Object.keys(state.currentCoupon)){
			    Vue.set(state.currentCoupon,k,"");
			}
		}
	}
});
export default store
