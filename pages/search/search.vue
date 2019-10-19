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
					<button v-for="(item,index) in history" :key="index" v-if="index < 8" @click="handleBtnSearch(item)" class="cu-btn sm margin-bottom-10 margin-right-20 color-9b">{{item}}</button>
				</view>
			</view>
			<view class="search-hot">
				<view class="title flex justify-between size-34rpx  margin-bottom-10">
					<text>热门搜索</text>
				</view>
				<view class="content flex flex-wrap color-9b"> <!-- :class="item.more?'color-5ea046':'color-9b'" -->
					<button v-for="(item,index) in hot" :key="index" class="cu-btn sm margin-bottom-10 margin-right-20" @click="handleBtnSearch(item)" >{{item}}</button>
				</view>
			</view>
		</view>
		<view class="search-result" v-if="isSearching">
			<view class="search-result-list" v-if="!isNodata">
				<view class="good-list" >
					<view class="good-item" v-for="(item,i) in list" :key="i">
						<view class="good-item-left">
							<image :src="item.thumb" mode=""></image>
						</view>
						<view class="good-item-right">
							<text class="name">{{item.name}}</text>
							<text class="desc text-ellipsis">{{item.desc}}</text>
							<view class="ctrl-module">
								<view class="price-list ">
									<text class="new text-price">{{filter.money(item.price)}}</text>
									<text class="old text-price">{{filter.money(item.market)}}</text>
								</view>
								<view class="ctrl-btns">
									<button class="cu-btn line-green round sm" v-show="item.num>0" @click="changeGoodCount(item,false)">-</button>
									<text  v-show="item.num>0">{{item.num}}</text>
									<button class="cu-btn bg-green round sm " @click="changeGoodCount(item,true)">+</button>
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
	import {mapMutations} from "vuex"
	
	export default {
		components:{
			noData
		},
		data() {
			return {
				history:[],
				hot:[],
				list:[],
				isNodata : false,
				isSearching:false,
				searchVal:"",
				placeholder:"山竹"
			}
		},
		onLoad() {
				this.getHotSearch()
		},
		methods: {
			...mapMutations([
				"changeCount"
			]),
			getHotSearch(){
				let _t = this
				_t.$http.post({
					url:`/mini/search/hot/`,
				},(res)=>{
					_t.hot.push(...res.data)
				})
			},
			changeGoodCount(item,t){
				this.changeCount({item,t})
			},
			InputFocus(){
				this.isSearching = false
			},
			InputBlur(e){
				let _t = this;
				let val = e.detail.value
				_t.searchVal = val == "" ? _t.placeholder : val
			},
			handleSearch(){
				let _t = this
				_t.isSearching = true
				if(_t.searchVal == ""){
					_t.searchVal = _t.placeholder
				}
				_t.$http.post({
					url:`/mini/search/`,
					data:{
						keyword:_t.searchVal
					},
				},res => {
					console.log(res)
					_t.list = [];
					_t.list.push(...res.data)
					if(_t.list.length == 0){
						_t.isNodata = true
					}
				})
				
				_t.appendHistory()
			},
			handleBtnSearch(item){
				let _t = this;
				_t.searchVal = item
				_t.handleSearch()
			},
			handleClearHistory(){
				this.history = []
			},
			appendHistory(){
				let _t = this;
				_t.history.unshift(_t.searchVal)
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
