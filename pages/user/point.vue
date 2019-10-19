<template>
	<view style="height: 100%;">
		<view class="point-list">
			<view class="point-item" v-for="(item, index) in pointList" :key="index">
				<view class="left">
					<text>积分来源:购买</text>
					<text>获得时间:{{ filter.dateFormat("YYYY-mm-dd HH:MM",item.time) }}</text>
				</view>
				<view class="right text-green">{{ item.point }}</view>
			</view>
		</view>
		<noData text="还没有获得积分,快去赚积分吧~" v-if="pointList.length == 0"></noData>
	</view>
</template>

<script>
import noData from '../../components/noData/noData.vue';
export default {
	components: {
		noData
	},
	data() {
		return {
			amount: 0,
			pointList: []
		};
	},
	onLoad() {
		this.getPoints();
	},
	methods: {
		getPoints() {
			const _t = this;
			_t.$http.post(
				{
					url: '/mini/user/point/'
				},
				res => {
					if (res.code == 0) {
						_t.amount = res.data.amount;
						_t.pointList = [];
						_t.pointList.push(...res.data.list);
						_t.pointList.push(...res.data.list);
						_t.pointList.push(...res.data.list);
					}
				}
			);
		}
	}
};
</script>

<style lang="less">
.point-list {
	padding: 20rpx;
	.point-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border: 1px dotted #aaa;
		border-radius: 20rpx;
		.left {
			display: flex;
			flex-direction: column;
			font-size: 34rpx;
		}
		.right {
			font-size: 70rpx;
		}
	}
}
</style>
