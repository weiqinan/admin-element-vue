<template>
    <div class="indexlayout-right-footer footer">
        <div class="footer-links">
            <div class="hd">
				<ul>
					<li><a href="#">关于我们</a></li>
					<li><a href="#">服务条款</a></li>
					<li><a href="#">意见反馈</a></li>
					<li><a href="#">帮助中心</a></li>
				</ul>
				<p>量化街客服：8001 </p>
				<p>工作时间：周一到周五 09:00-18:00</p>
			</div>
        </div>
        <div class="footer-copyright">
            NiuFx.com是Rockest公司旗下品牌，Rockest (HK) Company Limited为香港特别行政区政府工商注册企业，企业编号：2854643
        </div>
    </div>
</template>
<script>
export default {
    name: 'LayoutIndexRightFooter'
};
</script>
<style lang="scss" scoped>
.indexlayout-right-footer {
    padding: 24px 0 0;
    background: #1F1F1F;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
    color: #fff;
    .footer-links {
        margin-bottom: 10px;
        a {
            margin-right: 30px;
            color: #fff;
            text-decoration: none;
            &:last-child {
                margin-right: 0;
            }
            &:hover{
                color: #515a6e;
            }
        }
    }
    .footer-copyright{
        background: #3A3A3A;
        padding: 10px;
        color: #ccc;
    }
}
</style>