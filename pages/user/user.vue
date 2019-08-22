<template>
	<page>
		 <!-- 未登录 -->
		<view class="user-header padding flex justify-between" v-if="!userinfo.nickName">
			<view class="user-avatar flex justify-center align-center">
				<view class="cu-avatar lg round margin-left" style="background-image:url(http://ww1.sinaimg.cn/large/8b283c03gy1g61nw88qr4j205i05eaas.jpg);"></view>
				<view class="user-name flex flex-direction">
					<text class="name">未登录</text>
					<button type="default" class="cu-btn round line-black" @click="goLogin">登录享会员特权</button>
				</view>
			</view>
		</view>
		<!-- 已登录 -->
		<view class="user-header padding flex justify-between" v-if="userinfo.nickName">
			<view class="user-avatar flex justify-center align-center">
				<view class="cu-avatar lg round margin-left" :style="'background-image:url('+userinfo.avatarUrl+')'"></view>
				<view class="user-name flex flex-direction">
					<text class="name">{{userinfo.nickName}}</text>
				</view>
			</view>
			<view class="user-info flex text-center">
				<view class="user-infoitem padding flex flex-direction">
					<text>500</text>
					<text class="text-grey-user size-20rpx">我的积分</text>
				</view>
				<view class="user-infoitem padding flex flex-direction">
					<text>3</text>
					<text  class="text-grey-user size-20rpx">优惠券</text>
				</view>
			</view>
		</view>
		
		<view class="user-bindTip padding flex align-center size-24rpx solid-bottom">
			<text class="iconfont icon-phone size-30rpx"></text>
			<text class="text-grey-user">找不到订单或优惠券?绑定手机号试试</text>
			<button type="default" class="cu-btn sm lines" style="margin-left: auto;color:#45A436">立即绑定</button>
		</view>
		<view class="user-menus solid-bottom">
			<view class="demo-title">
				<view class="flex padding justify-between">
					<view class="title-name">我的订单</view>
					<view class="showAll" @tap="goOrders(0)">查看全部订单></view>
				</view>
				<view class="cu-list grid col-4 no-border" >
					<view class="cu-item" v-for="(item,index) in menuslist" :key="index" @click="goOrders(index+1)">
						<view class="iconfont size-60rpx" :class="'icon-' + item.iconname" style="color: #5EA046;">
							<view class="cu-tag badge" v-if="item.badge!=0">
								<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
							</view>
						</view>
						<text class="size-24rpx" style="color:#9B9B9B">{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="user-list">
			<view class="demo-title">
				<view class="flex padding justify-between">
					<view class="title-name">其他</view>
					<view class="showAll"></view>
				</view>
			</view>
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow" v-for="(item,index) in userPagelist" :key="index">
					<view class="content flex justify-start align-center">
						<text class="iconfont size-50rpx color-000" :class="'icon-'+item.iconname">
							
						</text>
						<text class="color-000" style="margin-left: 20rpx;" v-if="item.type=='text'">{{item.name}}</text>
						<button class="contact-btn color-000" open-type="contact" v-if="item.type == 'button'">{{item.name}}</button>
					</view>
				</view>
			</view>
		</view>
	</page>
</template>

<script>
	export default {
		data() {
			return {
				menuslist:[
					{name:"待付款",iconname:"pay",badge:10},
					{name:"待发货",iconname:"pack",badge:0},
					{name:"待收货",iconname:"logistics",badge:10},
					{name:"退款中",iconname:"refund",badge:10},
				],
				userPagelist:[
					{name:"收货地址",iconname:"location-o",type:'text'},
					{name:"我的优惠券",iconname:"coupon-o",type:'text'},
					{name:"我的积分",iconname:"points",type:'text'},
					{name:"联系客服",iconname:"service-o",type:'button'},
				],
				userinfo:{}
			};
		},
		methods:{
			getUser(){
				console.log(1)
				// uni.authorize({
				//     scope: 'scope.userLocation',
				//     success(res) {
				// 		console.log(res)
				//         console.log("授权成功!")
				// 		// uni.getLocation()
				//     },
				// 	fail(res){
				// 		console.log(res)
				// 	}
				// })
			},
			goOrders(index){
				uni.navigateTo({
					url:`/pages/orders/orders?tab=${index}`
				})
			},
			goLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		},
		created() {
			// uni.authorize({
			//     scope: 'scope.userInfo',
			//     success() {
			//         uni.getUserInfo()
			//     }
			// })
			let _that = this;
			// uni.login({
			//   provider: 'weixin',
			//   success: function (loginRes) {
			//     console.log(loginRes.authResult);
			//     // 获取用户信息
			//     uni.getUserInfo({
			//       provider: 'weixin',
			//       success: function (infoRes) {
			//         console.log('用户昵称为：' + infoRes.userInfo.nickName);
			// 		console.log(infoRes)
			// 		_that.userinfo = infoRes.userInfo
			// 		console.log(_that.userinfo)
			//       }
			//     });
			//   }
			// });
		}
	}
</script>

<style lang="less">
.user-avatar{
	.user-name{
		margin-left: 20rpx;
		justify-content: center;
		align-items: flex-start;
		color: #000000;
		.name{
			font-size: 34rpx;
		}
		button{
			margin-top: 10rpx;
			height:36rpx;
			font-size: 20rpx;
		}
	}
}
.contact-btn{
	margin: 0;
	padding:0;
	margin-left: 20rpx;
	width: 100%;;
	background:#fff;
	font-size:30rpx;
	text-align:left;
	&::after{
		display: none;
	}
}

</style>
