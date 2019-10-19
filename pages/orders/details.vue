<template>
	<page>
		<view class="bg-f6">
			<view class="order-dl-status margin-bottom-10 padding">
				<text class='color-9b font-weight500 size-40rpx'>{{filter.orderStatusText(order.status)}}</text>
			</view>
			<view class="order-dl-contact padding margin-bottom-10">
				<view class="contact flex align-center justify-between">
					<view class="contact-info flex flex-direction">
						<text class="font-weight500 size-34rpx">收货人信息</text>
						<text class="size-28rpx">{{order.addr.name + " " + order.addr.phone}}</text>
						<text class="color-9b size-24rpx">{{order.addr.addr}}</text>
					</view>
					<view class="express-plan">
						<button  class="cu-btn bg-f6 font-weight500 margin-right-10">配送计划</button>
					</view>
				</view>
			</view>
			
			<view class="balance-list">
				<view class="balance-item flex padding-tb10-lr20 align-center size-28rpx solid-bottom" v-for="(item,index) in order.detail" :key="index">
					<view class="left margin-right-10">
						<image :src="item.thumb" mode=""></image>
					</view>
					<view class="center flex flex-direction">
						<text class="color-000 text-ellipsis">{{item.name}}</text>
						<text class="size-24rpx color-9b text-ellipsis">{{item.desc}}</text>
					</view>
					<view class="right flex flex-direction">
						<text class="text-price color-000">{{filter.money(item.price)}}</text>
						<text class="size-24rpx color-9b text-right margin-top-10">x {{item.num}}</text>
					</view>
				</view>
			</view>
			
			<view class="order-dl-info flex flex-direction" style="padding-top: 40rpx;">
				<view class="flex justify-between align-center padding-tb10-lr20">
					<text class="font-weight500">商品合计:</text>
					<text><text class="text-price"></text>{{filter.money(order.money.amount)}}</text>
				</view>
				<view class="flex justify-between solid-bottom align-center margin-bottom-10 padding-tb10-lr20">
					<text class="font-weight500">优惠:</text>
					<text><text class="text-price"></text></text>
				</view>
				<view class="total-price solid-bottom flex justify-between align-center margin-bottom-10 padding">
					<button class="cu-btn line color-000" open-type="contact">
						<text class="iconfont icon-service-o"></text>联系客服
					</button>
					<text>
						实付:
						<text class="text-price"></text>
						<text class="color-5ea046">{{filter.money(order.money.product)}}</text>
					</text>
				</view>
				<view class="order-number flex flex-direction  padding-tb10-lr20" style="padding-bottom: 40rpx;">
					<view class="flex justify-between" @tap="handleCopy">
						<text class="color-9b">订单编号:{{order.sn}}</text>
						<view class="copy">
							<text class="color-9b">|</text>
							<text class="font-weight500"> 复制</text>
						</view>
					</view>
					<view class="time">
						<text class="color-9b">下单时间:{{order.created}}</text>
					</view>
				</view>
			</view>
			<view class="footer flex justify-end align-center bg-f6 padding">
				<button  class="cu-btn bg-f6 font-weight500 margin-right-10">删除</button>
				<button  class="cu-btn lines-green">再次购买</button>
			</view>
		</view>
	</page>
</template>

<script>
	import {testOrders} from "../../common/util.js"
	export default {
		data() {
			return {
				order:{},
				sn:"",
			};
		},
		onLoad(options) {
			this.sn = options.sn
			this.getDetail(options.sn)
		},
		methods:{
			getDetail(sn){
				const _t = this;
				_t.$http.post({
					url:"/mini/order/detail/",
					data:{
						sn:sn
					}
				},res => {
					if(res.code == 0){
						_t.order = res.data
						console.log(_t.order)
					}
				})
			},
			handleCopy(){
				const _t = this;
				uni.setClipboardData({
					data: _t.sn,
				    success: function (res) {
				        console.log(res.data);
				    }
				});
			}
		}
	}
</script>

<style lang="less">

</style>
