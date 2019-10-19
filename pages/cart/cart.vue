<template>
	<page>	
		<view class="">
			<view class="good-list cu-list menu"  v-if="enablelist.length > 0" :class="index == enablelist.length-1?'good-block':''">
				<view class="good-item cu-item" :class="modalName=='move-box-'+ i?'move-cur':''"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + i"
				 :id="i==0?'first':''" v-for="(item,i) in enablelist" :key="i">
					<view class="select-form"  @click="handleSelect(item)">
						<text :class="'cuIcon-round'" v-show="!item.isSelect" style="color:#dddddd"></text>
						<text :class="'cuIcon-roundcheckfill'" v-show="item.isSelect" style="color:#52b537"></text>
					</view>
					<view class="good-item-left">
						<image :src="item.product.thumb" mode=""></image>
					</view>
					<view class="good-item-right">
						<text class="name">{{item.product.name}}</text>
						<text class="desc text-ellipsis">{{item.product.desc}}</text>
						<view class="ctrl-module">
							<view class="price-list ">
								<text class="new text-price">{{filter.money(item.price)}}</text>
								<!-- <text class="old text-price">{{item.oldPrice}}</text> -->
							</view>
							<view class="ctrl-btns">
								<button class="cu-btn line-green round sm" v-show="item.num>0" @click.stop="changeCount(item.product,false)">-</button>
								<text  v-show="item.num>0">{{item.num}}</text>
								<button class="cu-btn bg-green round sm " @click.stop="changeCount(item.product,true)">+</button>
							</view>
						</view>
					</view>
					<view class="move" @tap="delProduct(item)">
						<view class="bg-red">删除</view>
					</view>
				</view>
			</view>
			<view class="padding-20 text-center" v-if="disablelist.length > 0">
				以下物品已失效,点击<button  class="cu-btn line-gray round sm">一键删除</button>
			</view>
			<view class="good-list cu-list menu"  v-if="disablelist.length > 0" :class="index == disablelist.length-1?'good-block':''">
				<view class="good-item cu-item" :class="modalName=='move-box-'+ i?'move-cur':''"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + i"
				 :id="i==0?'first':''" v-for="(item,i) in disablelist" :key="i">
					<view class="good-item-left">
						<image :src="item.product.thumb" mode=""></image>
					</view>
					<view class="good-item-right">
						<text class="name">{{item.product.name}}</text>
						<text class="desc text-ellipsis">{{item.product.desc}}</text>
						<view class="ctrl-module">
							<view class="price-list ">
								<text class="new text-price">{{filter.money(item.price)}}</text>
								<!-- <text class="old text-price">{{item.oldPrice}}</text> -->
							</view>
						</view>
					</view>
					<view class="move" @tap="delProduct(item)">
						<view class="bg-red">删除</view>
					</view>
				</view>
			</view>
			<noData v-if="enablelist.length == 0 && disablelist.length == 0"></noData>
		</view>
		<view class="cart-ctrl" v-if="enablelist.length > 0">
			<view class="select-btn" @click="handleSelectAll()">
				<view class="select-form">
					<text :class="'cuIcon-round'" v-show="!allSelect" style="color:#dddddd"></text>
					<text :class="'cuIcon-roundcheckfill'" v-show="allSelect" style="color:#52b537"></text>
				</view>
				<text class="select-all">全选</text>
			</view>
			<view class="cart-total">
				<text class="text-total">合计:<text class="total-val text-price">{{filter.money(totalPrice)}}</text></text>
				<text class="text-discount">已优惠:<text  class="discount-val text-price">0</text>(免运费)</text>
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
				allSelect:true,
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				selectList:[]
			};
		},
		computed:{
			...mapState({
				enablelist : state => state.cartlist.enable,
				disablelist : state => state.cartlist.disable,
				cartSelectList : state => state.cartSelectList
			}),
			totalPrice(){
				let total = 0;
				this.enablelist.forEach(item => {
					if(item.isSelect){
						total += item.price * 1000 * item.num
					}
				})
				return total / 1000
			},
			canGo(){
				let flag = true;
				this.enablelist.forEach(item => {
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
				"createNewBalance",
				"delFromCart",
				"setCartSelect",
				"delCartSelect"
			]),
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			changeCount(item,t){
				const _t = this
				if(!t && item.num == 1){
					uni.showModal({
					    title: '删除商品',
					    content: '您确定要删除商品吗?',
					    success: function (res) {
					        if (res.confirm) {
					            _t.changeGoodCount({item,t})
								_t.changeAllSelect()
								
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}else{
					_t.changeGoodCount({item,t})
				}
			},
			// 删除商品
			delProduct(item){
				this.delFromCart({id:item.pid})
			},
			changeAllSelect(){
				let _t = this;
				let flag = true;
				_t.enablelist.length && _t.enablelist.forEach(item => {
					if(!item.isSelect){
						flag = false
						return
					}
				})
				_t.allSelect = flag ? true : false
				
				
			},
			handleSelect(item){
				let _t = this;
				item.isSelect = !item.isSelect;
				if(!item.isSelect){
					_t.setCartSelect(item)
				}else{
					_t.delCartSelect(item)
				}
				_t.changeAllSelect()
			},
			handleSelectAll(){
				let _t = this;
				//  默认全选
				let flag = true;

				_t.enablelist.forEach(item => {
					item.isSelect = !_t.allSelect  ? true : false
				})
				_t.allSelect = !_t.allSelect
				_t.enablelist.forEach(item => {
					if(_t.allSelect){
						_t.delCartSelect(item)
					}else{
						_t.setCartSelect(item)
					}
				})
			},
			// 创建结算单
			goBalance(){
				let _t = this;
				let balance = [];
				_t.enablelist.forEach(item => {
					if(item.isSelect){
						balance.push(item)
					}
				})

				_t.createNewBalance(balance)
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
