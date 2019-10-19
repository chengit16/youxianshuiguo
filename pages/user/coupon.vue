<template>
	<view style="height: 100%;background: #FAFAFA;">
		<view class="coupon-list">
			<view class="coupon-item" :class="item.selected ? 'active':''" v-for="(item, index) in list" :key="index" @tap="selectCoupon(item)">
				<view class="left">
					<text>满{{ filter.money(item.amount) }}可用</text>
					<text>优惠券编号:{{ item.serial }}</text>
					<text>有效期:{{ filter.dateFormat('YYYY-mm-dd', item.received) }}至{{ filter.dateFormat('YYYY-mm-dd', item.expired) }}</text>
				</view>
				<view class="right text-green">
					<text class="text-price"></text>
					{{ filter.money(item.money) }}
				</view>
			</view>
		</view>
		<noData text="暂时没有优惠券~" v-if="list.length == 0"></noData>
	</view>
</template>

<script>
import noData from '../../components/noData/noData.vue';
import { mapState,mapMutations } from 'vuex';
export default {
	components: {
		noData
	},
	data() {
		return {
			list: [],
			showSelect: true
		};
	},
	computed:{
		...mapState({
			 currentPrice: state => state.currentPrice,
			 currentCoupon: state => state.currentCoupon
		})
	},
	onShow() {
		this.getList();
		const _t = this;
		var pages = getCurrentPages(); // 当前页面
		var beforePage = pages[pages.length - 2]; // 前一个页面
		console.log(beforePage);
		if (beforePage.route.endsWith('balance')) {
			_t.showSelect = true;
		} else {
			_t.showSelect = false;
		}
	},
	methods: {
		...mapMutations([
			'setCurrentCoupon',
			'setCurrentCouponPrice',
			'clearCurrentCoupon'
			]),
		getList() {
			const _t = this;
			_t.$http.post(
				{
					url: '/mini/coupon/'
				},
				res => {
					if (res.code == 0) {
						_t.list = [];
						res.data.forEach(item => {
							item.selected = false
							_t.list.push(item)
						})
						if(_t.showSelect && _t.currentCoupon.serial){
							_t.list.forEach(item => {
								if(item.serial == _t.currentCoupon.serial){
									item.selected = true
								}
							})
						}
					}
				}
			);
		},
		selectCoupon(item) {
			const _t = this;
			if (_t.showSelect) {
				if(_t.currentCoupon.serial && item.serial == _t.currentCoupon.serial){
					item.selected = false
					_t.clearCurrentCoupon()
					_t.setCurrentCouponPrice(0)
					uni.navigateBack({
					    delta: 1
					});
				}else{
					if(_t.currentPrice < item.amount){
						uni.showToast({
							icon:"none",
							title:"订单总价不能低于¥"+_t.filter.money(item.amount),
							duration:3000
						})
					}else{
						item.selected = true
						_t.setCurrentCouponPrice(item.money)
						_t.setCurrentCoupon(item);
						uni.navigateBack({
						    delta: 1
						});
					}
				}
				
			}
		}
	}
};
</script>

<style lang="less">
.coupon-list {
	padding: 20rpx;
	background: #fafafa;
	.coupon-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border: 1px dotted #aaa;
		border-radius: 20rpx;
		&.active{
			border: 1px dotted #39b54a;
		}
		.left {
			display: flex;
			flex-direction: column;
			font-size: 28rpx;
		}
		.right {
			font-size: 70rpx;
		}
	}
}
</style>
