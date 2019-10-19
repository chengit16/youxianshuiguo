<template>
	<page>
		<view class="balance bg-f6">
			<view class="cu-list menu sm-border margin-bottom-10">
				<view class="cu-item arrow" @tap="getAddress">
					<view class="content flex" >
						<text class="color-000">选择收货地址</text>
					</view>
					<view class="action">
						<view class="name-tel" v-if="addr.name">{{ addr.name }} {{ addr.phone }}</view>
						<view class="text-grey text-sm" v-if="addr.name">{{addr.city+addr.county+" "+addr.addr}}</view>
						<view class="text-grey text-sm" v-if="!addr.name">
							请选择收货地址
						</view>
					</view>
				</view>
			</view>
			<view class="balance-list margin-bottom-10">
				<view class="balance-item flex padding-tb10-lr20 align-center size-28rpx solid-bottom" v-for="(item,index) in classifyData" :key="index">
					<view class="left margin-right-10">
						<image :src="item.product.thumb" mode=""></image>
					</view>
					<view class="center flex flex-direction">
						<text class="color-000 text-ellipsis">{{item.product.name}}</text>
						<text class="size-24rpx color-9b text-ellipsis">{{item.product.desc}}</text>
					</view>
					<view class="right flex flex-direction">
						<text class="text-price color-000">{{filter.money(item.price)}}</text>
						<text class="size-24rpx color-9b text-right margin-top-10">x {{item.num}}</text>
					</view>
				</view>
			</view>
			<view class="express-plan margin-bottom-10">
				<view class="flex padding justify-start align-center">
					<view class="title-name">其他</view>
					<view class="color-9b size-20rpx margin-left-10">
						配送计划可编辑，下单成功后不可调整
					</view>
				</view>
				<view class="plan-list">
					<view class="plan-item flex align-center solid-bottom">
						<view class="left flex  align-center">
							
						</view>
						<view class="right flex justify-between plan-date">
							<view class="blk blk-date" v-for="(pc,index) in planDate" :key="index" :class="{'blk-date-nextweek':pc.nextWeek}">
								<text>{{pc.nextWeek ? '下周':'周'}}{{pc.weekText}}</text>
							</view>
						</view>
					</view>
					<view class="plan-item flex align-center sm-border solid-bottom" v-for="(item,i) in classifyData" :key="i">
						<view class="left flex  align-center">
							<view class="flex flex-direction">
								<image :src="item.product.thumb" mode=""></image>
								<text class="text-ellipsis size-24rpx">{{item.name}}</text>
							</view>
							<view class="color-9b size-20rpx">
								<text>x {{item.num}}</text>
							</view>
						</view>
						<view class="right flex justify-between" :class="{'error':sum(item.plan,item.num)}">
							<view class="blk" v-for="(d,i1) in item.plan" :key="i1">
								<!-- <text>{{d == 0 ? '-':d}}</text> -->
								<picker @change="bindPickerChange" :data-row="i" :data-col="i1" :data-count="item.num" :value="d" :range="item.range">
									<text>{{d == 0 ? '-':d}}</text>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu sm-border margin-bottom-10">
				<view class="cu-item arrow">
					<view class="content">
						<text class="color-000">积分抵扣</text>
					</view>
					<view class="action" style="width: 400rpx; text-align: right;">
						<!-- <text class="text-grey text-sm">0积分</text> -->
						<picker @change="bindPointChange" :value="index" :range="array" mode="selector">
							<view class="uni-input text-grey">{{array[index]}}</view>
						</picker>
					</view>
				</view>
				<view class="cu-item arrow" @tap="selectCoupon">
					<view class="content">
						<text class="color-000">优惠券</text>
					</view>
					<view class="action">
						<text class="text-grey"><text class="text-price"></text>-{{filter.money(currentCouponPrice) || 0}}</text>
					</view>
				</view>
			</view>
			<form>
				<view class="cu-form-group">
					<view class="title">备注</view>
					<input placeholder="给我们留言(选填)" name="input" v-model="remark"></input>
				</view>
			</form>
			<view class="footer flex justify-between align-center padding-tb10-lr20">
				<view class="total-price flex align-center">
						<view class="">
							<text class="size-28rpx">应付:<text class="text-price color-5ea046"></text><text class="price color-5ea046">{{filter.money(totalPrice)}}</text></text>
						</view>
						<text class="margin-left-10">|</text>
						
						<view class="margin-left-10 size-24rpx">
							<text>优惠:<text class="text-price"></text>{{filter.money(currentPoint + currentCouponPrice)}}</text>
						</view>
				</view>
				<view class="submit-btn">
					<button type="primary" class="lg" @tap="submitOrder">提交订单</button>
				</view>
			</view>
		</view>
	</page>
</template>

<script>
	import { mapState,mapMutations } from "vuex"
	import { weekText } from "../../common/util.js"
	export default {
		data() {
			return {
				remark:"",
				 array: [],
				 index: 0,
				 usePoint:0,
				 useCoupon:0,
			};
		},
		computed:{
			...mapState({
				classifyData:state => state.newBalance,
				addr : state => state.addr,
				point: state => state.user.point,
				currentCoupon:state => state.currentCoupon,
				currentPoint: state=> state.currentPoint,
				currentCoupon: state => state.currentCoupon,
				currentCouponPrice: state => state.currentCouponPrice
			}),
			totalPrice(){
				const _t = this;
				let total = 0;
				this.classifyData.forEach(item => {
					total += item.price  * item.num
				})
				total = total - _t.currentPoint - _t.currentCouponPrice
				console.log(total)
				_t.setCurrentPrice(total)
				return total 
			},
			planDate(){
				let d = [];
				let time = new Date()
				for(let i=0;i<7;i++){
					let newTime = new Date(time.getTime()+(3600000 * 24 * (i+12)))
					let week = new Date(newTime).getDay()
					let obj = {
						timestamp : newTime,
						week : week,
						weekText : weekText(week)
					}
					d.push(obj)
				}
				let flag = false
				d.forEach((item,index) => {
					if(index > 0 && d[index-1].week == 0){
						flag = true
					}
					if(flag){
						item.nextWeek = true
					}else{
						item.nextWeek = false
					}
				})
				return d
			}
			
		},
		onShow() {
			const _t = this;
			this.getAddrList()
			_t.array = []
			const pointArraylen = Math.floor(_t.point / 100)
			for(let i=0;i<pointArraylen+1;i++){
				_t.array.push(i*100)
			}
		},
		methods:{
			...mapMutations([
				"getAddrList",
				"setCurrentPoint",
				"setCurrentPrice"
			]),
			sum(arr,count){
				let sum = 0;
				arr.forEach(item => sum+=item*1)
				return sum == count ? false : true
			},
			bindPointChange(e) {
				const _t = this;
				
				this.index = e.target.value
				this.usePoint = _t.array[_t.index]
				this.setCurrentPoint(_t.array[_t.index])

			},
			bindPickerChange (e) {
				let _t = this;
				let row = e.target.dataset.row
				let col = e.target.dataset.col
				let count = e.target.dataset.count
				this.classifyData[row].plan.splice(col, 1, e.target.value*1)
			},
			selectCoupon(){
				const _t = this;
				uni.navigateTo({
					url:'/pages/user/coupon'
				})

			},
			getAddress(){
				const _t = this;
				uni.navigateTo({
					url:'/pages/user/addr/addr'
				})
			},
			submitOrder(){
				let _t = this;
				console.log(_t.addr)
				if(_t.addr.name == ""){
					uni.showToast({
						icon:"none",
						title:"请选择收货地址"
					})
					return
				}
				
				let planFlag = false
				_t.classifyData.forEach(item => {
					if(_t.sum(item.plan,item.num)){
						planFlag = true
					}
				})
				if(planFlag){
					uni.showToast({
						icon:"none",
						title:"请检查配送计划"
					})
					return;
				}
				
				
				_t.$http.post({
					url:"/mini/order/pay/",
					data:{
						list:_t.classifyData,
						addr:_t.addr,
						formId:"",
						remark:_t.remark,
						point:_t.currentPoint,
						coupon:_t.currentCouponPrice
					}
				},(res) => {
					uni.requestPayment({
					    provider: 'wxpay',
					    timeStamp: res.data.timeStamp,
					    nonceStr: res.data.nonceStr,
					    package: res.data.package,
					    signType: res.data.signType,
					    paySign: res.data.paySign,
					    success: function (res) {
							uni.showToast({
								icon:"success",
								title:"下单成功!",
								duration:2000,
								success() {
									_t.clearCurrentCoupon();
									_t.setCurrentCouponPrice(0);
									_t.setCurrentPoint(0)
									uni.navigateTo({
										url:`/pages/orders/orders?tab=0&code=all`
									})
								}
							})
					    },
					    fail: function (err) {
					        console.log('fail:' + JSON.stringify(err));
					    }
					});
				})
			}
		}
	}
</script>

<style lang="less">

	.plan-list{
		.plan-item{
			.left{
				width:220rpx;
				padding-left:20rpx;
				padding-bottom:10rpx;
				image{
					width: 70rpx;
					height: 70rpx;
				}
				text{
					width:100rpx;
				}
			}
			.right{
				flex:1;
				padding:0 20rpx;
				height:120rpx;
				line-height:120rpx;
				&.error{
					.blk{
						color:red !important;
					}
				}
				.blk{
					width: 80rpx;
					color:#9b9b9b;
					font-size: 20rpx;
					text-align: center;
					
				}
				&.plan-date {
					height: 60rpx;
					line-height:60rpx;
					.blk-date{
						color:#000;
					}
					.blk-date-nextweek{
						color:#F5A623;
					}
				}
				
			}
		}
	}
	.balance{
		padding-bottom: 120rpx;
	}
	.footer{
		position: fixed;
		bottom:0;
		left: 0;
		width: 100%;
		height: 120rpx;
	}
</style>
