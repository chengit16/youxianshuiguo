<template>
	<view class="container">
		<view class="address-list cu-list menu sm-border">
			<view class="address-item cu-item" v-for="(item, index) in addressList" :key="index" @tap="selectTap(item)">
				<view class="left" v-if="showSelect"><icon type="success_no_circle" size="22" v-show="item.id == addr.id" /></view>
				<view class="center">
					<view class="name-tel">{{ item.name }} {{ item.phone }}</view>
					<view class="address-box">{{ item.province + item.city + item.county + item.addr }}</view>
				</view>
				<view class="right">
					<view class="edit" @tap.stop="editAddess(item.id)"><text class="lg text-gray cuIcon-edit"></text></view>
					<view class="delete" @tap.stop="deleteAddess(item.id)"><text class="lg text-gray cuIcon-delete"></text></view>
				</view>
			</view>
		</view>
		<view class="addr-btn">
			<button type="default" @tap="addNewAddr">新增收货地址</button>
			<!-- <button type="primary" class="margin-top-20" @tap="addNewAddrByWechat">使用微信地址</button> -->
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			showSelect:true
		};
	},
	computed: {
		...mapState({
			addressList: state => state.addrList,
			addr: state => state.addr
		})
	},
	onShow() {
		const _t = this;
		var pages = getCurrentPages(); // 当前页面
		 var beforePage = pages[pages.length - 2]; // 前一个页面
		 if(beforePage.route.endsWith("balance")){
			 _t.showSelect = true
		 }else{
			 _t.showSelect = false
		 }
		 _t.getAddrList();
	},
	methods: {
		...mapMutations([
			'getAddrList',
			'updateCurrtAddr',
			'cleanCurrtAddr'
		]),
		selectTap(item) {
			const _t = this;
			if(_t.showSelect){ 
				this.updateCurrtAddr(item)
				uni.navigateBack({
				    delta: 1
				});
			}
		},
		editAddess(id) {
			const _t = this;
			uni.navigateTo({
				url: `edit?id=${id}`
			});
		},
		deleteAddess(id){
			const _t = this;
			_t.$http.post({
				url:"/mini/user/addr-del/",
				data:{
					id:id
				}
			}, res => {
				if (res.code == 0) {
					uni.showToast({
						title: '删除成功!',
						icon: 'none'
					});
					if(id == _t.addr.id){
						_t.cleanCurrtAddr()
					}

					_t.getAddrList();

				}
			});
		},
		addAddess() {
			console.log('tap add new Address');
		},
		addNewAddr() {
			uni.navigateTo({
				url: 'newAddr'
			});
		}
	}
};
</script>

<style lang="less">
.address-list {
	.address-item {
		display: flex;
		padding: 20rpx !important;
		.left {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 20rpx;
			margin-right: 10rpx;
			min-width: 80rpx;
		}
		.center {
			display: flex;
			flex-direction: column;
			.name-tel {
				margin-bottom: 10rpx;
				font-size: 32rpx;
			}
			.address-box {
				color: #aaa;
			}
		}
		.right {
			margin-left: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			view {
				padding: 20rpx;
			}
			text {
				font-size: 44rpx;
			}
			.delete {
				text {
					color: red;
				}
			}
		}
	}
}
.addr-btn {
	margin-top: 30rpx;
	padding: 30rpx;
	background: #f6f6f6;
}
</style>
