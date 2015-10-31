/**
 * Created by wungcq on 15/5/2.
 */
define(function (require, exports, moudle) {


    var picRound = function () {
        this._picWrapper = $(".pic-round .pic-wrapper");
        this.pics = $(".pic-round .pic-wrapper .img-box");
        this.bgs = $(".pic-round .pic-wrapper .img-box .img");
        //this.pageNumber = this.pics.length - 1;
        this.pageNumber = 1;
        this.currentPage = null;
        this.timer = null;
        this.direction = 1;//滚动来自上方

        this.init();
    };

    picRound.prototype = {
        init: function () {
            this.currentPage = 0;
            this.setSize();
            this.bind();
            this.auto();
            this.setActive();
            //var firstChild = this.pics.get(0).outerHTML;
            //this._picWrapper.append(firstChild);
        },
        setSize: function () {
            var me = this;
            var w = $(window).innerWidth();
            this.pics.css("width", w + "px");
            this.w = w > 1200 ? w : 1200;
            if(w>1200) {
                this.w = w
            }else if(w> 425) {
                this.w = 1200
            }else {
                this.w = w;
            }
            if(w>425) {
                this.animationTime = 10000;
            }else {
                this.animationTime = 3000;
            }
            var nav_left = (w - $(".pic-round .nav").outerWidth()) / 2;
            $(".pic-round .nav").css("left", nav_left);
            $(".down-arrow").css("left", (0.5 * w - 15) + "px");

            this._picWrapper.css({
                "transform": "translateX(" + -me.w + "px)",
                "-webkit-transform": "translateX(" + -me.w + "px)",
                "-moz-transform":  "translateX(" + -me.w + "px)"
            });
            var top = $(window).scrollTop();
            var height = $(window).innerHeight();

        },

        getFirst: function () {
            return this.pics[ 0 ];
        },

        getLast: function () {
            return this.pics[ this.pageNumber ];
        },

        getPic: function (index) {
            return this.pics[ index ];
        },

        pop: function () {
            var _temp = this.pics.pop();
            this._picWrapper.remove(_temp);
            return _temp;
        },

        push: function (pic) {
            this._picWrapper.append(pic);
            return this;
        },

        unShift: function () {
            var _temp = this.pics.unShift();
            this._picWrapper.remove(_temp);
            return _temp;
        },

        headInsert: function (pic) {
            var _temp = this.getFirst();
            pic.insertBefore(_temp);
            return _temp;
        },

        goAhead: function () {
            var me = this;
            var t = me.currentPage;
            var currentPage = me.currentPage < me.pageNumber ? me.currentPage + 1 : 0;
            if (t == me.pageNumber) {
                me.currentPage++;
//        me._picWrapper.animate({"margin-left":-100 * (me.currentPage+1) +"%"},500);
                me._picWrapper.css({
                    "transition": "all ease .5s",
                    "-webkit-transition": "all ease .5s",
                    "-moz-transition": "all ease .5s"
                });
                this._picWrapper.css({
                    "transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)",
                    "-webkit-transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)",
                    "-moz-transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)"
                });
                var f = function () {
//					this._picWrapper.animate({"margin-left": -100 * 1 + "%"}, 0);
                    me._picWrapper.css({
                        "transition": "all ease 0s",
                        "-webkit-transition": "all ease 0s",
                        "-moz-transition": "all ease 0s"
                    });
                    me._picWrapper.css({
                        "transform": "translateX(" + (-me.w ) + "px)",
                        "-webkit-transform": "translateX(" + (-me.w ) + "px)",
                        "-moz-transform": "translateX(" + (-me.w ) + "px)"
                    });
                    this.currentPage = 0;
                }
            } else {
                me.currentPage = currentPage;
//        me._picWrapper.animate({"margin-left":-100 * (me.currentPage+1) +"%"},500);
                me._picWrapper.css({
                    "transition": "all ease .5s",
                    "-webkit-transition": "all ease .5s",
                    "-moz-transition": "all ease .5s"
                });
                me._picWrapper.css({
                    "transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)",
                    "-webkit-transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)",
                    "-moz-transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)"
                });
                var f = null;
            }

            setTimeout(function () {
                try{
                    me.setActive(f, null);
                    me.bgs[ t ].classList.remove("scaleUp");
                }catch(e){
                }
            }, 500);

        },
        auto: function () {
            var me = this;
            me.timer = setInterval(function () {
                if (me.currentPage == undefined || me.currentPage < 0 || me.currentPage > me.pageNumber) {
                    me.currentPage = 0;
                    me.setActive();
                } else {
                    me.goAhead();
                }
            }, me.animationTime);
        },
        stop: function () {
            var me = this;
            clearInterval(me.timer);
        },

        goBack: function () {
            var me = this;
            var t = me.currentPage;
            var currentPage = me.currentPage > 0 ? me.currentPage - 1 : me.pageNumber;
            if (t == 0) {
                me.currentPage = me.pageNumber + 1;
//				me._picWrapper.animate({"margin-left": 0 + "%"}, 500);
                this._picWrapper.css({
                    "transform": "translateX(" + 0 + "px)",
                    "-webkit-transform": "translateX(" + 0 + "px)",
                    "-moz-transform": "translateX(" + 0 + "px)"
                });
                var f = function () {
//          this._picWrapper.animate({"margin-left": -100 * (me.pageNumber+1)+"%"},0);

                    this._picWrapper.css({
                        "transition": "all ease 0s",
                        "-webkit-transition": "all ease 0s",
                        "-moz-transition": "all ease 0s"
                    });

                    this._picWrapper.css({
                        "transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)",
                        "-webkit-transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)",
                        "-moz-transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)"
                    });
                    this.currentPage = me.pageNumber;
                }
            } else {
                me.currentPage = currentPage;
//        me._picWrapper.animate({"margin-left":-100 * (me.currentPage+1) +"%"},500);
                me._picWrapper.css({
                    "transition": "all ease .5s",
                    "-webkit-transition": "all ease .5s",
                    "-moz-transition": "all ease .5s"
                });

                me._picWrapper.css({
                    "transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)",
                    "-webkit-transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)",
                    "-moz-transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)"
                });
                var f = null;
            }

            setTimeout(function () {
                me.setActive(f, null);
                me.bgs[ t ].classList.remove("scaleUp");
            }, 500);
        },

        jump: function (index) {
            var me = this;
            var t = me.currentPage;

            if (t == me.pageNumber && index == 0) {
                me.goAhead();
            } else if (t == 0 && index == me.pageNumber) {
                me.goBack();
            } else {
                me.currentPage = index;
//        me._picWrapper.animate({"margin-left":-100 * (me.currentPage+1) +"%"},500);
                me._picWrapper.css({
                    "transition": "all ease .5s",
                    "-webkit-transition": "all ease .5s",
                    "-moz-transition": "all ease .5s"
                });

                me._picWrapper.css({
                    "transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)",
                    "-webkit-transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)",
                    "-moz-transform": "translateX(" + (-me.w * (me.currentPage + 1)) + "px)"
                });
                setTimeout(function () {
                    $(".pic-round .pic-wrapper .img-box .img").attr("class", "img");
                    me.setActive(null, null, index + 1);
                    //me.bgs[t].classList.remove("scaleUp");

                }, 500);
            }

        },
        setActive: function (before, after, index) {
            var me = this;
            before && before.call(me);
            try{
                $(".pic-round .nav .item").attr("class", "item");
                var _index = index || me.currentPage + 1;
                me.bgs.get(_index).classList.add("scaleUp");
                //console.log(me.bgs.get(_index));
                $(".pic-round .nav .item").get(me.currentPage).classList.add("active");
                $(".pic-round .title .title-img").removeClass("active");
                $(".pic-round .title .title-img").get(me.currentPage).classList.add("active");
                after && after.call(me);
            }catch(e){
            }
        },

        showPage: function () {

        },

        bind: function () {
            var me = this;
            $(".pic-round .left-arrow").click(function () {
                me.goBack();
            });
            $(".pic-round .right-arrow").click(function () {
                me.goAhead();
            });
            $(".pic-round .nav .item").click(function (ev) {
                var _target = $(this);
                var pageIndex = parseInt(_target.attr("data-page"));
                me.jump(pageIndex);
            });
            var isBinded = false;


            $(window).resize(function () {
                me.setSize();
            });

        },


    };

    (function () {
        var p = new picRound();
    })();
});