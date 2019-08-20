<script>
	import { mapMutations ,mapGetters } from 'vuex'
	import classifyData from "./pages/cate/classify.data.js";
	export default {
		computed:{
			...mapGetters({
				l : "cartlistlen"
			})
		},
		onLaunch: function() {
			console.log('App Launch')
			
		},
		onShow: function() {
			console.log('App Show')
			console.log(this.l)
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations([
				'updateGoodslist'
			])
		},
		created(){
			this.updateGoodslist(classifyData)
		},
		// watch:{
		// 	l(val,val1){
		// 		console.log(val)
		// 		if (val == 0) {
		// 			uni.removeTabBarBadge({
		// 				index: 2
		// 			})
		// 		}else{
		// 			uni.setTabBarBadge({
		// 			  index: 2,
		// 			  text: `${val}`
		// 			})
		// 		}
		// 	}
		// }
	}
</script>

<style lang="less">
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "common/icon.css";
	page{
		background-color:#f6f6f6;
		width: 100%;
		height: 100%;
	}
	view{
		background-color: #FFFFFF;
	}
	.good-list{
		display: flex;
		flex-direction: column;
		// justify-content: center;
		// align-items: center;
		.good-item-title{
			margin-right: auto;
			padding-left: 20rpx;
			text-align: center;
			color:#888888;
			font-size: 30rpx;
		}
		.good-item{
			display:flex;
			width:100%;
			padding:20rpx;
			.good-item-left{
				margin-right: 50rpx;
				image{
					width:150rpx;
					height: 150rpx;
				}
			}
			.good-item-right{
				display: flex;
				flex:1;
				flex-direction: column;
				font-size:24rpx;
				.name{
					font-weight: 500;
				}
				.desc{
					color:#AAAAAA;
				}
				.ctrl-module{
					display: flex;
					justify-content: space-between;
					margin-top:20rpx;
					.ctrl-btns{
						display: flex;
						justify-content: space-between;
						align-items: center;
						button{
							// padding: 0;
							width: 40rpx;
							height: 40rpx;
							font-size: 26rpx;
							// text-align: center;
							line-height: 40rpx;
							// border-radius: 50%;
						}
						text{
							margin:0 16rpx;
						}
					}
				}
			}
		}

	}
	.price-list{
		margin-top: 10rpx;
		font-size:22rpx;
		.new{
			margin-right: 10rpx;
			font-size: 26rpx;
			color: #09BB07;
		}
		.old{
			color:#AAAAAA;
			text-decoration:line-through;
		}
	}

	// module title
	.demo-title{
		.title-name{
			font-size: 28rpx;
			font-weight: 500;
		}
		.showAll{
			font-size: 26rpx;
			color:#888888;
		}
	}
	// 超出省略
	
	.text-ellipsis{
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-line-clamp:1;
		-webkit-box-orient:vertical;
	}
	// 字体大小
	.size-16rpx{
		font-size: 16rpx !important;
	}
	.size-20rpx{
		font-size: 20rpx !important;
	}
	.size-24rpx{
		font-size: 24rpx !important;
	}
	.size-28rpx{
		font-size: 28rpx !important;
	}
	.size-30rpx{
		font-size: 30rpx !important;
	}
	.size-34rpx{
		font-size: 34rpx !important;
	}
	.size-38rpx{
		font-size: 38rpx !important;
	}
	.size-40rpx{
		font-size: 40rpx !important;
	}
	.size-50rpx{
		font-size: 50rpx !important;
	}
	.size-60rpx{
		font-size: 60rpx !important;
	}
	.size-70rpx{
		font-size: 70rpx !important;
	}
	
	.color-000{
		color:#000000 !important;
	}
	.color-5ea046{
		color:#5EA046 !important;
	}
	.color-9b{
		color:#9B9B9B !important;
	}
	
	.line-green{
		color:#5EA046;
	}
	.bg-green{
		background:#5EA046;
	}
	.bg-f6{
		background:#F6F6F6;
	}
	
	.padding-20{
		padding:20rpx;
	}
	.padding-tb10-lr20{
		padding:10rpx 20rpx;
	}
	//
	.margin-bottom-10{
		margin-bottom: 10rpx;
	}
	.margin-top-10{
		margin-top: 10rpx;
	}
	.margin-right-10{
		margin-right: 10rpx;
	}
	.margin-left-10{
		margin-left: 10rpx;
	}
</style>
