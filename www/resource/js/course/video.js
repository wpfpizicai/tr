define(function (require, exports, moudle) {
    alifenxi.track("course_video_view", {
        "course_name": $('#c_course_name').html(),
        "resource_name" : $("#c-video-play-list .current-play .c-video-play-list-item-title ").html()
    });

    //分页
    var Pager = require('js/widget/pager');
    var commentBtn = $("#comment-submit");
    var commentArea = $("#user-comment-editor");
    var user_avator = ($('#ne_user_avator').val() - 0) || 1;
    var nickname = commentBtn.attr("data-nickname") || $('#ne_user_name').val();
    var userId = $('#ne_user_id').val();
    var courseid = commentBtn.attr("data-course-id");

    function addPage() {
        var page = new Pager({
            container: $('#video_pager'),
            sum: $('#comment_list').attr('data-num') - 0,
            count: 10,
            step: 10,
            showCount: false,
            start: 0,
            onChange: function (num, count) {
                drawComment(num + 1, count)
            }
        });
        page.init();
    };

    addPage();

    //加载评论
    function drawComment(num, count) {
        var tpl =
            ['<% comments.forEach(function(val){%>',
                '<article class="comment">',
                '<div class="left-content">',
                '<div class="user-head-icon user-head-<%=val.avator||1%>" data-id="<%=val.userid%>"></div>',
                '</div>',
                '<div class="right-content">',
                '<a href="" class="link user-name"><%=val.nickname%></a>',
                '<section class="comment-content"><p><%=val.comment%></p></section>',
                '<% var d = new Date(val.updatetime).toLocaleDateString();%>',
                '<time class="comment-time"><%=val.updatetime%></time>',
                '</div>',
                '</article>',
                '<%})%>'].join("");
        $.get('/course/getcomment', {id: courseid, page: num, limit: count}, function (result) {
            if (result.errno == 0) {
                $('#comment_list').html(_.template(tpl, {comments: result.data}))
            }
        }, 'json')
    };
    //留下评论
    commentBtn.unbind("click").on("click", function (e) {
        var data = {};
        var userId = commentBtn.attr("data-user-id");
        data.comment = commentArea.val();
        data.id = courseid;
        if (data.comment.trim() == '') {
            return false;
        }

        $.post('/course/comment', data, 'json').done(function (res) {
            if (res.errno == 0) {
                var tmp = [
                    '<article class="comment">',
                    '<div class="left-content">',
                    '<div class="user-head-icon user-head-', user_avator, '"></div>',
                    '</div>',
                    '<div class="right-content">',
                    '<a href="" class="link user-name">', nickname, '</a>',
                    '<section class="comment-content"><p>', data.comment, '</p></section>',
                    '<time class="comment-time">刚刚</time>',
                    '</div>',
                    '</article>'
                ].join('');
                ALERT('提示', '评论成功！');
                $(tmp).prependTo('#comment_list');
                commentArea.val('');
            }
        });


    });

    //guanggao
    function showAQWERDF() {
        var entity = $("#c-video-view >.video-js .c-course-video-aqwerdf");

        if (entity.length == 0) {
            var html = $("#AQWERDF").html();
            $("#c-video-view >.video-js").append(html);
            var entity = $("#c-video-view >.video-js .c-course-video-aqwerdf");
        }
        if (entity.attr("data-ban") == "1") {
            //是否被ban
            return false;
        } else {
            entity.addClass("active");
        }

    }

    //
    function hideAQWERDF() {
        $("#c-video-view >.video-js .c-course-video-aqwerdf").removeClass("active");
    }

    var endList = (function () {
        var endList = $("#tmp-c-course-video-end-list").html();
        return {
            showEndList: function () {
                if ($("#c-video-view >.video-js .c-course-video-end-list").length > 0) {
                    $("#c-video-view >.video-js .c-course-video-end-list").addClass("active");
                } else {
                    $("#c-video-view >.video-js").append(endList);
                }
            },
            hideEndList: function () {
                $("#c-video-view >.video-js .c-course-video-end-list").removeClass("active");
            }
        }
    })();


    function addPreviousAndNext2ToolBar() {
        var html = $("#tool-bar-previous-next").html();
        $(html).insertAfter(".vjs-control-bar .vjs-remaining-time");
    }

    (function initPlayer() {
        //设置全屏
        var v = document.getElementById("really-cool-video");

        var h = document.documentElement.clientHeight - 60;
        v.setAttribute("height", h + "px");

        var player = videojs('really-cool-video', {}, function () {

            $(".container").removeClass("loading");
            addPreviousAndNext2ToolBar();
            //
            //bind

            bindVideoEvents();
        });

    })();


    function bindVideoEvents() {


        var video = $("video").eq(0);

        //事件
        video.on("ended", function (e) {
            endList.showEndList();

        }).on("play", function (e) {
            //hideAQWERDF();
            endList.hideEndList();

        }).on("pause", function (e) {
            //showAQWERDF();
        });

        $("video source").each(function(index,elem){
            $(this).on('error',function(e){
                //console.error($(e.target).attr("src"));
                alifenxi.track("course_load_error", {
                    "course_name": $('#c_course_name').html(),
                    "resource_name" : $(e.target).attr("src"),
                    "username" : $('#signin_user').html()
                });
            })
        });

        //videojs API绑定


    }

    bindVideoEvents();


});