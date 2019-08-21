<template>
	<page>	
		<view class="">
			<view class="good-list"  v-if="classifyData.length > 0" :class="index == classifyData.length-1?'good-block':''">
				<view class="good-item" :id="i==0?'first':''" v-for="(item,i) in classifyData" :key="i">
					<view class="select-form"  @click="handleSelect(item)">
						<text :class="'cuIcon-round'" v-show="!item.isSelect" style="color:#dddddd"></text>
						<text :class="'cuIcon-roundcheckfill'" v-show="item.isSelect" style="color:#52b537"></text>
					</view>
					<view class="good-item-left">
						<image :src="item.src" mode=""></image>
					</view>
					<view class="good-item-right">
						<text class="name">{{item.name}}</text>
						<text class="desc text-ellipsis">{{item.desc}}</text>
						<view class="ctrl-module">
							<view class="price-list ">
								<text class="new text-price">{{item.price}}</text>
								<text class="old text-price">{{item.oldPrice}}</text>
							</view>
							<view class="ctrl-btns">
								<button class="cu-btn line-green round sm" v-show="item.count>0" @click.stop="changeCount(item,false)">-</button>
								<text  v-show="item.count>0">{{item.count}}</text>
								<button class="cu-btn bg-green round sm " @click.stop="changeCount(item,true)">+</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<noData v-if="classifyData.length == 0"></noData>
		</view>
		<view class="cart-ctrl" v-if="classifyData.length > 0">
			<view class="select-btn" @click="handleSelectAll()">
				<view class="select-form">
					<text :class="'cuIcon-round'" v-show="!allSelect" style="color:#dddddd"></text>
					<text :class="'cuIcon-roundcheckfill'" v-show="allSelect" style="color:#52b537"></text>
				</view>
				<text class="select-all">全选</text>
			</view>
			<view class="cart-total">
				<text class="text-total">合计:<text class="total-val text-price">{{totalPrice}}</text></text>
				<text class="text-discount">已优惠:$<text  class="discount-val">36.0</text>(免运费)</text>
			</view>
			<view class="cart-submit">
				<button type="primary" size="mini" @click="goBalance" :disabled="canGo">去结算</button>
			</view>
		</view>
	</page>
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	import noData from "../../components/noData/noData.vue"
	export default {
		components:{
			noData
		},
		data() {
			return {
				isNodata:true,
				allSelect:false,
			};
		},
		computed:{
			...mapState({
				classifyData: state => state.cartlist
			}),
			totalPrice(){
				let total = 0;
				this.classifyData.forEach(item => {
					if(item.isSelect){
						total += item.price * 1000 * item.count
					}
				})
				
				return total / 1000
			},
			canGo(){
				let flag = true;
				this.classifyData.forEach(item => {
					if(item.isSelect){
						flag = false
					}
				})
				return flag ? true : false
			}
		},
		created(){
			
		},
		methods:{
			...mapMutations([
				"changeGoodCount",
				"createNewBalance"
			]),
			changeCount(item,t){
				const _that = this
				if(!t && item.count == 1){
					uni.showModal({
					    title: '删除商品',
					    content: '您确定要删除商品吗?',
					    success: function (res) {
					        if (res.confirm) {
					            _that.changeGoodCount({item,t})
								_that.changeAllSelect()
								
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}else{
					_that.changeGoodCount({item,t})
				}
			},
			changeAllSelect(){
				let _that = this;
				let flag = true;
				_that.classifyData.length && _that.classifyData.forEach(item => {
					if(!item.isSelect){
						flag = false
						return
					}
				})
				_that.allSelect = flag ? true : false
			},
			handleSelect(item){
				let _that = this;
				item.isSelect = !item.isSelect;
				_that.changeAllSelect()
			},
			handleSelectAll(){
				let _that = this;
				//  默认全选
				let flag = true;

				_that.classifyData.forEach(item => {
					item.isSelect = !_that.allSelect  ? true : false
				})
				_that.allSelect = !_that.allSelect
			},
			// 创建结算单
			goBalance(){
				let _that = this;
				let balance = [];
				_that.classifyData.forEach(item => {
					if(item.isSelect){
						balance.push(item)
					}
				})

				_that.createNewBalance(balance)
				// 跳转
				uni.navigateTo({
					url:'/pages/balance/balance'
				})
			}
		},
		
	}
</script>

<style lang="less">
.select-form{
	display: flex;
	justify-content: center;
	align-items: center;
	padding:0 20rpx;
	font-size: 50rpx;
}
.cart-ctrl{
	position: fixed;
	right: 0;
	left: 0;
	bottom: 0;
	padding:15rpx;
	display: flex;
	align-items: center;
	.select-btn{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20rpx;
		font-size: 60rpx;
		.select-all{
			font-size:26rpx;
			color:#7F8389;
		}
	}
	.cart-total{
		display: flex;
		flex:1;
		flex-direction: column;
		.text-total{
			font-size:30rpx;
			color:#000000;
			
		}
		.total-val{
			color: #45A436;
		}
		.text-discount{
			font-size:26rpx;
			color:#7F8389;
			// .value{
			// 	color#45A436;
			// }
		}
	}
	.cart-submit{
		button{
			width: 200rpx;
			font-size: 30rpx;
		}
	}
	
}
</style>
