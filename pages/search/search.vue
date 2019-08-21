<template>
	<view class="padding-bottom-20">
		<view class="search-input">
			<view class="cu-bar search bg-fff flex align-center">
				<view class="search-form bg-fff solid"  style="border-radius: 16rpx;">
					<text class="cuIcon-search"></text>
					<input  @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" :placeholder="placeholder" confirm-type="search" :value="searchVal"></input>
				</view>
				<view class="action" @click="handleSearch">
					<text class="size-34rpx color-5ea046">搜索</text>
				</view>
			</view>
		</view>
		<view class="serach-module" v-if="!isSearching">
			<view class="search-history" v-if="history.length">
				<view class="title flex justify-between size-34rpx">
					<text class="">历史搜索</text>
					<text class="cuIcon-delete" @click="handleClearHistory"></text>
				</view>
				<view class="content flex flex-wrap">
					<button v-for="(item,index) in history" :key="index" v-if="index < 8" @click="handleBtnSearch(item)" class="cu-btn sm margin-bottom-10 margin-right-20 color-9b">{{item.name}}</button>
				</view>
			</view>
			<view class="search-hot">
				<view class="title flex justify-between size-34rpx  margin-bottom-10">
					<text>热门搜索</text>
				</view>
				<view class="content flex flex-wrap color-9b">
					<button v-for="(item,index) in hot" :key="index" class="cu-btn sm margin-bottom-10 margin-right-20" @click="handleBtnSearch(item)" :class="item.more?'color-5ea046':'color-9b'">{{item.name}}</button>
				</view>
			</view>
		</view>
		<view class="search-result" v-if="isSearching">
			<view class="search-result-list" v-if="!isNodata">
				<view class="good-list" >
					<view class="good-item" v-for="(item,i) in list" :key="i">
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
									<button class="cu-btn line-green round sm" v-show="item.count>0" @click="changeCount(item,false)">-</button>
									<text  v-show="item.count>0">{{item.count}}</text>
									<button class="cu-btn bg-green round sm " @click="changeCount(item,true)">+</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<noData v-if="isNodata"></noData>
		</view>
	</view>
</template>

<script>
	import noData from "../../components/noData/noData.vue"
	import {testOrders} from "../../common/util.js"
	import {mapMutations} from "vuex"
	let testdata = []
	testdata = testOrders[0].list;
	testdata.forEach(item => {
		item.count = 0
	})
	export default {
		components:{
			noData
		},
		data() {
			return {
				history:[
					{id:0,name:"巨峰葡萄"},
					{id:1,name:"凯特芒果"},
					{id:2,name:"西洲蜜瓜"},
					{id:3,name:"早酥梨"},
					{id:4,name:"泰国山竹"}
				],
				hot:[
					{id:0,name:"巨峰葡萄",more:true},
					{id:1,name:"凯特芒果",more:true},
					{id:2,name:"西洲蜜瓜",more:false},
					{id:3,name:"早酥梨",more:false},
					{id:4,name:"泰国山竹",more:false},
					{id:5,name:"云南红提",more:false},
					{id:6,name:"百香果",more:false},
					{id:7,name:"澳大利亚甜蜜橘",more:false}
				],
				list:testdata,
				isNodata : false,
				isSearching:false,
				searchVal:"",
				placeholder:"山竹"
			}
		},
		methods: {
			...mapMutations([
				"changeGoodCount"
			]),
			changeCount(item,t){
				this.changeGoodCount({item,t})
			},
			InputFocus(){
				this.isSearching = false
			},
			InputBlur(e){
				let _that = this;
				let val = e.detail.value
				_that.searchVal = val == "" ? _that.placeholder : val
			},
			handleSearch(){
				let _that = this
				_that.isSearching = true
				//
				let arr = [true, false];
				let bol = arr[Math.floor(Math.random()*arr.length)];
				_that.isNodata = bol
				_that.appendHistory()
				
			},
			handleBtnSearch(item){
				let _that = this;
				_that.searchVal = item.name
				_that.isSearching = true
				//
				let arr = [true, false];
				let bol = arr[Math.floor(Math.random()*arr.length)];
				_that.isNodata = bol
				_that.appendHistory()
			},
			handleClearHistory(){
				this.history = []
			},
			appendHistory(){
				let _that = this;
				_that.history.unshift({
					name:_that.searchVal,
					id:_that.history.length
				})
			}
		}
	}
</script>

<style lang="less">
.search-history,.search-hot{
	padding:30rpx 30rpx 0 30rpx;
	.content{
		padding: 10rpx 10rpx 0 10rpx;
	}
}
</style>
