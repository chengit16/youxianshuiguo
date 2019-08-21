<template>
		<view class="comp-no-data flex justify-center align-center">
			<view class="logo flex flex-direction  align-center">
				<image src="http://ww1.sinaimg.cn/large/8b283c03gy1g61nw88qr4j205i05eaas.jpg" mode=""></image>
				<view class="margin-top-10">
					<text  class="size-34rpx color-5ea046">{{text}}</text>
				</view>
			</view>
		</view>
</template>

<script>
	export default{
		name: 'noData',
		props: {
		  // 文字描述
		  text: {
		    type: String,
		    default: '暂无商品!'
		  }
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="less">
	.comp-no-data{
		width: 100%;
		min-height:800rpx;
		.logo{
			padding:80rpx;
			image{
				width: 140rpx;
				height: 140rpx;
			}
		}
	}
</style>
