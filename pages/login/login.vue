<template>
	<view style="height:100%">
		<view class="logo flex justify-center align-center">
			<image src="http://ww1.sinaimg.cn/large/8b283c03gy1g61nw88npqj20b40awtaw.jpg" mode=""></image>
		</view>
		<view class="login-btns padding">
			<button type="primary" class="wechat" open-type="getUserInfo" @getuserinfo="getUser">微信一键登录</button>
			<button type="default" class="phone" open-type="getPhoneNumber" @getphonenumber="getPhone">手机号登录</button>
		</view>
		<view class="protocol">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			getUser(res){
				console.log(res)
			},
			getPhone(res){
				console.log(res)
			}
		},
		created(){
		}
	}
</script>

<style lang="less">
	.logo{
		padding:200rpx 0;
		image{
			width:200rpx;
			height:200rpx;
		}
	}
	.login-btns{
		.phone{
			margin-top:20rpx;
		}
	}
</style>
