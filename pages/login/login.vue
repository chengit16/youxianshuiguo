<template>
	<view style="height:100%">
		<view class="logo flex justify-center align-center">
			<image src="http://ww1.sinaimg.cn/large/8b283c03gy1g61nw88npqj20b40awtaw.jpg" mode=""></image>
		</view>
		<view class="login-btns padding">
			<button type="primary" class="wechat" open-type="getUserInfo" @getuserinfo="getUser">微信一键登录</button>
			<!-- <button type="primary" class="wechat"  @tap="handleLogin">微信一键登录</button> -->
			<button type="default" class="phone" open-type="getPhoneNumber" @getphonenumber="getPhone">手机号登录</button>
		</view>
		<view class="protocol">
			
		</view>
	</view>
</template>

<script>
	import { mapMutations } from "vuex"
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations([
				"setCode",
				"setToken",
				"setLogined",
				"setUser"
			]),
			getUser(res){
				console.log(res)
				let _t = this;
				if(res.detail.userInfo){
					_t.setUser(res.detail.userInfo);
					_t.$http.post({url:"/mini/user/save-profile",data:res.detail.userInfo},()=>{})
					_t.setLogined(true)
					uni.navigateBack();
				}else{
					uni.showToast({
						title:"您拒绝了授权,无法正常登录"
					})
				}
			},
			getPhone(res){
				console.log(res)
			},
			handleLogin(res){
				let _t = this;
				
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
