<template>
	<page>
		<view class="balance bg-f6">
			<view class="cu-list menu sm-border margin-bottom-10">
				<view class="cu-item arrow">
					<view class="content flex">
						<text class="color-000" style="margin-left: 20rpx;">选择收货地址</text>
					</view>
				</view>
			</view>
			<view class="balance-list margin-bottom-10">
				<view class="balance-item flex padding-tb10-lr20 align-center size-28rpx" v-for="(item,index) in classifyData" :key="index">
					<view class="left margin-right-10">
						<image :src="item.src" mode=""></image>
					</view>
					<view class="center flex flex-direction">
						<text class="color-000 text-ellipsis">{{item.name}}</text>
						<text class="size-24rpx color-9b text-ellipsis">{{item.desc}}</text>
					</view>
					<view class="right flex flex-direction">
						<text class="text-price color-000">{{item.price}}</text>
						<text class="size-24rpx color-9b text-right margin-top-10">x {{item.count}}</text>
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
					<view class="plan-item flex align-center">
						<view class="left flex  align-center">
							
						</view>
						<view class="right flex justify-between">
							<view class="blk blk-date" v-for="(pc,index) in planDate" :key="index" :class="{'blk-date-nextweek':pc.nextWeek}">
								<text>{{pc.nextWeek ? '下周':'周'}}{{pc.weekText}}</text>
							</view>
						</view>
					</view>
					<view class="plan-item flex align-center sm-border" v-for="(item,index) in classifyData" :key="index">
						<view class="left flex  align-center">
							<view class="flex flex-direction">
								<image :src="item.src" mode=""></image>
								<text class="text-ellipsis size-24rpx">{{item.name}}</text>
							</view>
							<view class="color-9b size-20rpx">
								<text>x {{item.count}}</text>
							</view>
						</view>
						<view class="right flex justify-between">
							<view class="blk" v-for="(d,index) in item.plan" :key="index">
								<text>{{d == 0 ? '-':d}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</page>
</template>

<script>
	import { mapState } from "vuex"
	function weekText(val){
		const weeklist = {
			0:"日",
			1:"一",
			2:"二",
			3:"三",
			4:"四",
			5:"五",
			6:"六"
		}
		return weeklist[val]
	}
	export default {
		data() {
			return {
				d:{
				"id":1,
				"name": "泰国金1111枕榴莲1份 - 约500克",
				"price": "18.00",
				"oldPrice": "17.99",
				"src": "http://ww1.sinaimg.cn/large/8b283c03gy1g5x4cpgtlpj206w078q4c.jpg",
				"desc": "金枕榴莲,水果之王,香味浓郁,口岸软糯,营养丰富",
				"key": "泰国金枕榴莲",
				"cat":1,
				"isSelect":false,
				"count":3,
				"plan":[0,0,0,0,0,0,0]
				},
			};
		},
		computed:{
			...mapState({
				classifyData:state => state.newBalance
			}),
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
		created() {
			console.log(this.classifyData)
		}
	}
</script>

<style lang="less">
	.balance-list{
		.balance-item{
			.left{
				image{
					width: 100rpx;
					height: 100rpx;
				}
			}
			.center{
				margin-right:30rpx;
			}
			.right{
				margin-left: auto;
			}
		}
	}
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
				
				.blk{
					width: 80rpx;
					color:#9b9b9b;
					font-size: 20rpx;
					text-align: center;
				}
				.blk-date{
					color:#000;
				}
				.blk-date-nextweek{
					color:#F5A623;
				}
			}
		}
	}

</style>
