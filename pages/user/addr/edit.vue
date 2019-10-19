<template>
	<view class="">
		<form @submit="" @reset="">
			<view class="cu-form-group margin-top">
				<view class="title">收货人</view>
				<input placeholder="请输入收货人姓名" name="input" v-model="name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="请输入联系电话" name="input" v-model="phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">地址选择</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view>
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="请输入详细地址" name="input" v-model="address"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">设为默认</view>
				<switch @change="SwitchisDefault" :class="isDefault?'checked':''" :checked="isDefault?true:false"></switch>
			</view>
			
		</form>
		<view class="addr-btn">
			<button type="default" @tap="save">保存并使用</button>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from "vuex"
	export default {
		data () {
			return{
				name:"",
				phone:"",
				address:"",
				region: ['', '', ''],
				regionCode:"",
				isDefault:false,
				addr:{
				},
				addrId:"",
				showSelect:false
			}
		},
		onLoad: function (option) { 
			let id = option.id
			const _t = this
			this.addrId = id
			this.getAddrById(id)
			var pages = getCurrentPages(); // 当前页面
			 var beforePage = pages[pages.length - 3]; // 前一个页面
			 console.log(beforePage)
			 if(beforePage.route.endsWith("balance")){
				 _t.showSelect = true
			 }else{
				 _t.showSelect = false
			 }
		},
		methods:{
			...mapMutations([
				"getAddrList",
				"updateCurrtAddr"
			]),
			RegionChange(e) {
				this.region = e.detail.value;
				this.regionCode = e.detail.code[2];
				console.log(e.detail.code)
			},
			SwitchisDefault(e){
				this.isDefault = e.detail.value;
			},
			getAddrById(id){
				const _t = this;
				_t.$http.post({
					url:"/mini/user/addr/",
					data:{
						id:id
					}
				},res => {
					if(res.code == 0){
						_t.addr = res.data
						_t.name = res.data.name
						_t.phone = res.data.phone
						_t.address = res.data.addr
						_t.region[0] = res.data.province
						_t.region[1] = res.data.city
						_t.region[2] = res.data.county
						_t.regionCode = res.data.region
						_t.isDefault = res.isDefault == '1' ? true:false
					}
				})
			},
			save(){
				const _t = this;

				if(_t.name == ""){
					showError("请输入收货人");
					return;
				}else if(_t.phone == ""){
					showError("请输入联系电话");
					return;
				}else if(_t.region[0] == ""){
					showError("请输选择地址");
					return;
				}else if(_t.detail == ""){
					showError("请输入详细地址");
					return;
				}
				
				function showError(str){
					return uni.showToast({
						title:str,
						icon:"none"
					})
				}
				
				_t.$http.post({
					url:"/mini/user/addr-save/",
					data:{
						id:_t.addrId,
						name:_t.name,
						phone:_t.phone,
						region:_t.regionCode,
						province:_t.region[0],
						city:_t.region[1],
						county:_t.region[2],
						addr:_t.address,
						isDefault:_t.isDefault ? "1" : "0"
					}
				},(res) => {
					if(res.code == 0){
						_t.updateCurrtAddr({
							addr: _t.address,
							city: _t.region[1],
							county: _t.region[2],
							id: res.data.id,
							isDefault: _t.isDefault ? "1" : "0",
							name: _t.name,
							phone: _t.phone,
							province: _t.region[0],
							region: _t.regionCode,
						})
						_t.getAddrList()
						uni.navigateBack({
						    delta: _t.showSelect ? 2 :1
						});
					}
				})
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	form{
		margin-bottom: 30rpx;
	}
	.addr-btn{
		padding: 30rpx;
		background:#f6f6f6;
	}
</style>
