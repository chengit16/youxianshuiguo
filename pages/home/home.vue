<template>
	<page>
		<!-- header -->
		<view class="header">
			<view class="hd-search">
				<view class="cu-bar search bg-white flex align-center">
					<view class="action">
						<text class="iconfont icon-location-o margin-right-10 size-38rpx"></text>
						<text class="size-30rpx color-000">南艺校区</text>
					</view>
					<view class="search-form" style="border-radius: 16rpx;">
						<text class="cuIcon-search"></text>
						<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="山竹" confirm-type="search"></input>
					</view>
				</view>
			</view>
		</view>
		<!-- advertising -->
		<view class="advertising">
			<view class="padding">
				<swiper class="screen-swiper cu-item square-dot" :indicator-dots="true" :circular="true"
						 :autoplay="true" interval="3000" duration="500" style="overflow: hidden;">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</swiper-item>
				</swiper>
			</view>
			
			<view>
				<view class="grid-menus">
					<view class="menu-item" v-for="(item,index) in gridList" :key="index">
						<image :src="item.src" mode=""></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- main -->
		<view class="main">
			<view class="demo-module">
				<view class="demo-title">
					<view class="flex padding justify-between">
						<view class="title-name">今日特惠</view>
						<view class="showAll" @click="goCate">全部商品></view>
					</view>
				</view>
				<view class="demo-body">
					<scroll-view :scroll-x="true">
						<view class="flex margin-bottom text-center">
							<view class="adv-group flex" v-for="(item,index) in list" :key="index">
								<image :src="item.src"></image>
								<text class="name">{{item.name}}</text>
								<view class="price-list ">
									<text class="new  text-price">{{item.price}}</text>
									<text class="old  text-price">{{item.oldPrice}}</text>
								</view>
							</view>
						</view>
					</scroll-view>

					
				</view>
			</view>
			<view class="demo-module">
				<view class="demo-title">
					<view class="flex padding justify-between">
						<view class="title-name">小食量</view>
						<view class="showAll" @click="goCateByIndex(1)">全部商品></view>
					</view>
				</view>
				<view class="demo-body">
					<!-- 商品列表 -->
					<view class="good-list"  v-for="(foods,index) in goodlist" :key="index">
						<view class="good-item" v-for="(item,i) in foods.foods" :key="i">
							<view class="good-item-left">
								<image :src="item.src" mode=""></image>
							</view>
							<view class="good-item-right">
								<text class="name">{{item.name}}</text>
								<text class="desc text-ellipsis">{{item.desc}}</text>
								<view class="ctrl-module">
									<view class="price-list ">
										<text class="new text-price">{{item.price}}</text>
										<text class="old text-price">{{item.oldPrice}}</text>
									</view>
									<view class="ctrl-btns">
										<button class="cu-btn line-green round sm" v-show="item.count>0" @click="changeCount(item,false)">-</button>
										<text  v-show="item.count>0">{{item.count}}</text>
										<button class="cu-btn bg-green round sm " @click="changeCount(item,true)">+</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</page>
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'http://ww1.sinaimg.cn/large/8b283c03gy1g64u6t16byj213s0ei4et.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}],

				gridList:[
					{name:"今日特惠",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49pjtemj205k05kwej.jpg")},
					{name:"小食量",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49pjehnj205k05kglm.jpg")},
					{name:"每日签到",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49phi81j205k05k3yi.jpg")},
					{name:"我的积分",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49phfl5j205k05kgln.jpg")}
				],
				list:[
					{name:"幸好有你",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49pip3rj209c09sadm.jpg")},
					{name:"甜蜜一游",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49pmngqj209c09sq60.jpg")},
					{name:"阳光玫瑰",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49plpwwj209c09s0vj.jpg")},
					{name:"清凉套餐",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49pij8uj209c09smzp.jpg")},
					{name:"幸好有你",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49pip3rj209c09sadm.jpg")},
					{name:"甜蜜一游",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49pmngqj209c09sq60.jpg")},
					{name:"阳光玫瑰",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49plpwwj209c09s0vj.jpg")},
					{name:"清凉套餐",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49pij8uj209c09smzp.jpg")},
					{name:"幸好有你",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49pip3rj209c09sadm.jpg")},
					{name:"甜蜜一游",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49pmngqj209c09sq60.jpg")},
					{name:"阳光玫瑰",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49plpwwj209c09s0vj.jpg")},
					{name:"清凉套餐",price:"18.00",oldPrice:"17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x49pij8uj209c09smzp.jpg")},
				],
				// goodlist:[
				// 	{name:"泰国金枕榴莲1份 - 约500克",price:"$18.00",oldPrice:"$17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cpgtlpj206w078q4c.jpg"),desc:"金枕榴莲,水果之王,香味浓郁,口岸软糯,营养丰富"},
				// 	{name:"美国车厘子1份 - 约500克",price:"$18.00",oldPrice:"$17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cpgylvj206w078jt7.jpg"),desc:"把这份甘甜空运到你的舌尖"},
				// 	{name:"小黄瓜+小番茄+葡萄切三拼 - 500克",price:"$18.00",oldPrice:"$17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cpgu79j206w080mys.jpg"),desc:"营养均衡,小数节课"},
				// 	{name:"西班牙香橙1份 - 约500克",price:"$18.00",oldPrice:"$17.99",src:("http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cph1tsj206w08040h.jpg"),desc:"汁水四溢,口岸甘甜"},
				// ]
			};
		},
		computed:{
			...mapState({
				goodlist:(state) => {
					let arr = [];
					arr.push(state.goodslist[0])
					return arr
				}
			})
		},
		created(){
			console.log(this.goodlist)
		},
		methods:{
			...mapMutations([
				"changeGoodCount",
				"updateActiveCate"
			]),
			changeCount(item,t){
				this.changeGoodCount({item,t})
			},
			goCate(){
				this.updateActiveCate(0)
				uni.switchTab({
				    url: '/pages/cate/cate'
				});
			},
			goCateByIndex(index){
				this.updateActiveCate(index)
				uni.switchTab({
				    url: '/pages/cate/cate'
				});
			},
			InputFocus(){
				uni.navigateTo({
				    url: '/pages/search/search'
				});
			}
		}
	}
</script>

<style lang="less">
	.grid-menus{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.menu-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding:20rpx;
			image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
			text{
				margin-top:10rpx;
				font-size: 26rpx;
			}
		}
	}
	.main{
		margin-top:10rpx;
	}
	.adv-group{
		flex-direction: column;
		align-items: center;
		padding:10rpx;
		image{
			width: 168rpx;
			height: 176rpx;
		}
		.name{
			font-size: 26rpx;
		}
	}

	
	
</style>
