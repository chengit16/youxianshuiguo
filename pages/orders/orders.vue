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
				>
					{{ item.name }}
				</view>
			</scroll-view>

			<view class="order-list bg-f6">
				<view class="order-item flex flex-direction padding margin-bottom-10" v-for="(order, index) in list" :key="index" @click="goDetail">
					<view class="header flex justify-between solid-bottom">
						<text class="order-status color-9b">已关闭</text>
						<text class="font-weight500">
							总价:
							<text class="text-price"></text>
							122.30
						</text>
					</view>
					<view class="content solid-bottom">
						<view class="content-body">
							<view class="flex align-center" v-if="order.list.length > 1">
								<view class="order-list-image" v-for="(item, i) in order.list" :key="i" v-if="i < 5"><image :src="item.src" mode=""></image></view>

								<text v-if="order.list.length > 3">...</text>
							</view>
							<view class="balance-list" v-if="order.list.length == 1">
								<view class="balance-item flex  align-center size-28rpx solid-bottom" v-for="(item, index) in order.list" :key="index">
									<view class="left margin-right-10"><image :src="item.src" mode=""></image></view>
									<view class="center flex flex-direction">
										<text class="color-000 text-ellipsis">{{ item.name }}</text>
										<text class="size-24rpx color-9b text-ellipsis">{{ item.desc }}</text>
									</view>
									<view class="right flex flex-direction">
										<text class="text-price color-000">{{ item.price }}</text>
										<text class="size-24rpx color-9b text-right margin-top-10">x {{ item.count }}</text>
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
			<view class="balance-list margin-bottom-10">
				<view class="balance-item flex padding-tb10-lr20 align-center size-28rpx solid-bottom" v-for="(item, index) in classifyData" :key="index">
					<view class="left margin-right-10"><image :src="item.src" mode=""></image></view>
					<view class="center flex flex-direction">
						<text class="color-000 text-ellipsis">{{ item.name }}</text>
						<text class="size-24rpx color-9b text-ellipsis">{{ item.desc }}</text>
					</view>
					<view class="right flex flex-direction">
						<text class="text-price color-000">{{ item.price }}</text>
						<text class="size-24rpx color-9b text-right margin-top-10">x {{ item.count }}</text>
					</view>
				</view>
			</view>
		</view>
	</page>
</template>

<script>
import { testOrders } from '../../common/util.js';

export default {
	onLoad(options) {
		console.log(options.tab);
		this.TabCur = options.tab;
	},
	data() {
		return {
			tabList: [{ name: '全部', key: 0 }, { name: '待付款', key: 1 }, { name: '待发货', key: 2 }, { name: '待收货', key: 3 }, { name: '退款中', key: 4 }],
			TabCur: 0,
			list: testOrders
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
		},
		goDetail(){
			uni.navigateTo({
				url:'details'
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
