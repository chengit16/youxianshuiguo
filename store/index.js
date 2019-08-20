import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		goodslist: [],
		cartlist: [{
				"id":1,
				"name": "泰国金1111枕榴莲1份 - 约500克",
				"price": "18.00",
				"oldPrice": "17.99",
				"src": "http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cpgtlpj206w078q4c.jpg",
				"desc": "金枕榴莲,水果之王,香味浓郁,口岸软糯,营养丰富",
				"key": "泰国金枕榴莲",
				"cat":1,
				"isSelect":false,
				"count":2
			},
			{
				"id":2,
				"name": "美国2222车厘子1份 - 约500克",
				"price": "18.00",
				"oldPrice": "17.99",
				"src": "http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cpgylvj206w078jt7.jpg",
				"desc": "把这份甘甜空运到你的舌尖",
				"key":"美国车厘子",
				"cat":1,
				"isSelect":false,
				"count":4
			},
			{
				"id":3,
				"name": "3333小黄瓜+小番茄+葡萄切三拼 - 500克",
				"price": "18.00",
				"oldPrice": "17.99",
				"src": "http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cpgu79j206w080mys.jpg",
				"desc": "营养均衡,小数节课",
				"key":"黄瓜",
				"cat":1,
				"isSelect":false,
				"count":3
			},
			{
				"id":4,
				"name": "444西班牙香橙1份 - 约500克",
				"price": "18.00",
				"oldPrice": "17.99",
				"src": "http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cph1tsj206w08040h.jpg",
				"desc": "汁水四溢,口岸甘甜",
				"key":"香橙",
				"cat":1,
				"isSelect":false,
				"count":3
			},
		],
		newBalance:[{
				"id":1,
				"name": "泰国金1111枕榴莲1份 - 约500克",
				"price": "18.00",
				"oldPrice": "17.99",
				"src": "http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cpgtlpj206w078q4c.jpg",
				"desc": "金枕榴莲,水果之王,香味浓郁,口岸软糯,营养丰富",
				"key": "泰国金枕榴莲",
				"cat":1,
				"isSelect":false,
				"count":2
			},
			{
				"id":2,
				"name": "美国2222车厘子1份 - 约500克",
				"price": "18.00",
				"oldPrice": "17.99",
				"src": "http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cpgylvj206w078jt7.jpg",
				"desc": "把这份甘甜空运到你的舌尖",
				"key":"美国车厘子",
				"cat":1,
				"isSelect":false,
				"count":4
			},
			{
				"id":3,
				"name": "3333小黄瓜+小番茄+葡萄切三拼 - 500克",
				"price": "18.00",
				"oldPrice": "17.99",
				"src": "http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cpgu79j206w080mys.jpg",
				"desc": "营养均衡,小数节课",
				"key":"黄瓜",
				"cat":1,
				"isSelect":false,
				"count":3
			},
			{
				"id":4,
				"name": "444西班牙香橙1份 - 约500克",
				"price": "18.00",
				"oldPrice": "17.99",
				"src": "http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cph1tsj206w08040h.jpg",
				"desc": "汁水四溢,口岸甘甜",
				"key":"香橙",
				"cat":1,
				"isSelect":false,
				"count":3
			},
		]
	
	},
	getters:{
		cartlistlen(state){
			return state.cartlist.length
		}
	},
	mutations: {
		// 更新商品数据
		updateGoodslist: function(state, data) {
			state.goodslist = [];
			state.goodslist.push(...data)
		},
		// 更新商品数量
		// 增加数量
		changeGoodCount(state, data) {
			let {item,t} = data;
			let flag = false;
			let tmp = {};
			// 更新商品列表
			state.goodslist.forEach(good => {
				// 商品列表+ - 
				good.foods.forEach(g => {
					if(g.id == item.id){
						if(t){
							g.count+=1
						}else{
							g.count-=1
						}
						//获取当前改变的item
						tmp = JSON.parse(JSON.stringify(g))
					}
				})
			})
			// 如果购物车列表为空 直接加入
			if(state.cartlist.length == 0){
				state.cartlist.push(tmp)
			}else{
				//如果不为空,判断是否存在
				state.cartlist.forEach(c => {
					if(c.id == item.id){
						flag = true
						return
					}
				})
				// 如果不存在 加入购物车
				if(!flag){
					state.cartlist.push(tmp)
				}else{
					// 存在 修改数量
					state.cartlist.forEach((c,i) => {
						if(c.id == item.id){
							if(t){
								c.count+=1
							}else{
								c.count-=1
								if(c.count == 0){
									state.cartlist.splice(i,1);
								}
							}
						}
					})
				}
			}
		},
		createNewBalance(state,data){
			state.newBalance = []
			if(data.length){
				let tmp = {}
				data.forEach(item => {
					tmp = JSON.parse(JSON.stringify(item))
					tmp.plan= new Array(0,0,0,0,0,0,0)
					state.newBalance.push(tmp)
				})
				
				state.newBalance.forEach(item => {
					let total = item.count;
					console.log(item.plan)
					while(total > 0){
						for(let i=0;i<7;i++){
							if(total == 0){
								return
							}
							total -= 1;
							item.plan[i] += 1;
						}
					}
				})
			}
			
		}
	}
});
export default store
