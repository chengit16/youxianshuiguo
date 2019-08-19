import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		goodslist: [],
		cartlist: []
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
		}
	}
});
export default store
