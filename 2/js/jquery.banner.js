
; //为了防止上一个程序没写";"
+function ($) {//将banner 绑定到jQuery
    $.Banner = function (options) {
        new Banner(options, this);
    }
    //banner动画函数
    function Banner(options, base_ele) { //options=>两种动画效果 //base_ele=>左右按钮
        this.init(options, base_ele);
    }
    Banner.prototype = {
        constructor : Banner,
        init(options, base_ele) {
            //当前显示的内容;
            this.index = 0;
            // 主体元素选择;
            this.bannerWrapper = $(".banner-wrapper");
            //动画模式;  如果没有传入动画方式，默认为fade
            this.animate = options.animate ? options.animate : "fade";
            //具体元素获取;
            this.bannerItem = this.bannerWrapper.children();
            // 有选择自动播放 则执行  没有不执行自动播放
            if (options.autoPlay) {
                this.autoPlay();
            }
            this.bannerNum = this.bannerItem.length;
            //按钮元素获取 => 按钮元素获取有风险所以加以判断;
            if (!options.nextBtn || !options.prevBtn) return;
            this.btnPrev = options.prevBtn;
            this.btnNext = options.nextBtn;
            //左箭头
            this.btnPrev
                .on("click.changeIndex", {
                    turn: "prev"
                }, $.proxy(this.change_index, this))
                .on("click.animation", $.proxy(this.animation, this))
            //右箭头    
            this.btnNext
                .on("click", {
                    turn: "next"
                }, $.proxy(this.change_index, this))
                .on("click", $.proxy(this.animation, this))
        },

        //改变banner 下标;
        change_index: function (event) {
            // console.log(this);
            //判断banner轮播方向
            var turnList = {
                "prev": function () {
                    this.prev = this.index;
                    if (this.index == 0) {
                        this.index = this.bannerNum - 1;
                    } else {
                        this.index--;
                    }
                }.bind(this),
                "next": function () {
                    this.prev = this.index;
                    if (this.index == this.bannerNum - 1) {
                        this.index = 0;
                    } else {
                        this.index++;
                    }
                }.bind(this)
            }
            //判断点击按钮事件data值(左右箭头)
            if (!(typeof turnList[event.data.turn] == "function")) return 0;
            turnList[event.data.turn]();
            // console.log(this.index);
        },

        //动画效果
        animation: function (event) {
            // console.log(event.data.ani)
            if (this.prev == this.index) return;
            //定义一个动画对象  slide fade
            var animationList = {
                "slide": function () {
                    animationList.slideFadeInit();
                    this.bannerItem.eq(this.index)
                        .addClass("active")
                        .css({
                            display: "none"
                        })
                        .slideDown()
                        .siblings()
                        .removeClass("active");
                }.bind(this),
                //fade 动画
                "fade": function () {
                    animationList.slideFadeInit();
                    this.bannerItem.eq(this.index)
                        .addClass("active")
                        .css({
                            display: "none"
                        })
                        .fadeIn()
                        .siblings()
                        .removeClass("active");
                }.bind(this),
                //让当前图片的z-index变成1，其他的变为空
                "slideFadeInit": function () {
                    this.bannerItem.eq(this.prev)
                        .css({
                            zIndex: 1
                        })
                        .siblings()
                        .css({
                            zIndex: ""
                        })
                }.bind(this)
            }
            animationList[this.animate]();
        },

        //自动播放
        autoPlay() {
            this.bannerWrapper.on("mouseenter", function () {//鼠标移入停止自动播放
                clearInterval(this.loopTimer);
            }.bind(this))
            this.bannerWrapper.on("mouseleave", function () {//鼠标移出开始播放
                clearInterval(this.loopTimer);
                this.loopTimer = setInterval(function () { //自动轮播
                    this.prev = this.index;
                    this.index = ++this.index % this.bannerNum;
                    this.animation();
                }.bind(this), 3000);
            }.bind(this))
            this.bannerWrapper.trigger("mouseleave")
        }
    }
}(jQuery);