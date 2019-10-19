<template>
	<page>
		<view>
			<scroll-view class="bg-white nav text-center margin-bottom-10" scroll-with-animation>
				<view
					class="cu-item font-weight500"
					:class="index == TabCur ? 'text-green cur' : ''"
					v-for="(item, index) in tabList"
					:key="item.key"
					@tap="tabSelect"
					:data-id="index"
					:data-code="item.code"
				>
					{{ item.name }}
				</view>
			</scroll-view>
			<noData v-if="list.length == 0" :text="'暂无订单'"></noData>
			<view class="order-list bg-f6">
				<view class="order-item flex flex-direction padding margin-bottom-10" v-for="(order, index) in list" :key="index" @click="goDetail(order.sn)">
					<view class="header flex justify-between solid-bottom">
						<text class="order-status color-9b">{{filter.orderStatusText(order.status)}}</text>
						<text class="font-weight500">
							总价:
							<text class="text-price"></text>
							{{filter.money(order.amount)}}
						</text>
					</view>
					<view class="content solid-bottom">
						<view class="content-body">
							<view class="flex align-center" v-if="order.detail.length > 1">
								<view class="order-list-image" v-for="(item, i) in order.detail" :key="i" v-if="i < 5"><image :src="item.thumb" mode=""></image></view>

								<text v-if="order.detail.length > 3">...</text>
							</view>
							<view class="balance-list" v-if="order.detail.length == 1">
								<view class="balance-item flex  align-center size-28rpx solid-bottom" v-for="(item, index) in order.detail" :key="index">
									<view class="left margin-right-10"><image :src="item.thumb" mode=""></image></view>
									<view class="center flex flex-direction">
										<text class="color-000 text-ellipsis">{{ item.name }}</text>
										<text class="size-24rpx color-9b text-ellipsis">{{ item.desc }}</text>
									</view>
									<view class="right flex flex-direction">
										<text class="text-price color-000">{{ filter.money(item.price) }}</text>
										<text class="size-24rpx color-9b text-right margin-top-10">x {{ item.num }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="footer flex justify-end align-center">
						<button  class="cu-btn bg-fff font-weight500 margin-right-10">删除</button>
						<button  class="cu-btn lines-green">再次购买</button>
					</view>
				</view>
			</view>	
		</view>
	</page>
</template>

<script>
import noData from "../../components/noData/noData.vue"
export default {
	components:{
		noData
	},
	data(){
		return {
			activeCode:"all"
		}
	},
	onLoad(options) {
		console.log(options);
		this.TabCur = options.tab;
		this.activeCode = options.code;
		this.getOrders(options.code)
	},
	data() {
		return {
			tabList: [
				{ name: '全部', key: 0 , code : 'all' }, 
				{ name: '待付款', key: 1 , code :"prepay"}, 
				{ name: '待发货', key: 2 , code : "send"}, 
				{ name: '待收货', key: 3 , code : "receive"}, 
				{ name: '退款中', key: 4 , code : "refund"},
			],
			TabCur: 0,
			list: []
		};
	},
	methods: {
		tabSelect(e) {
			const _t = this;
			this.TabCur = e.currentTarget.dataset.id;
			this.activeCode = e.currentTarget.dataset.code;
			this.getOrders(_t.activeCode);
		},
		goDetail(sn){
			uni.navigateTo({
				url:`details?sn=${sn}`
			})
		},
		getOrders(code){
			const _t = this;
			_t.$http.post({
				url:"/mini/order/",
				data:{
					type:code
				}
			},res => {
				if(res.code == 0){
					_t.list = [];
					_t.list.push(...res.data)
				}
			})
		}
	}
};
</script>

<style lang="less">
.order-list {
	.order-item {
		.hedaer {
		}
		.content {
			.order-list-image {
				margin-right: 20rpx;
				padding: 30rpx 10rpx;
				image {
					width: 100rpx;
					height: 100rpx;
				}
			}
			.balance-item{
				padding:30rpx 10rpx;
			}
		}
		.footer {
		}
	}
}
</style>
