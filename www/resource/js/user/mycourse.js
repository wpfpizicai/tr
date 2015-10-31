/**
 * Created by wungcq on 15/7/25.
 */
define(function (require, exports, module) {
    var tab2 = $("#learnt-course");
    var tab1 = $("#focus-course");
    var page2 = $("#learnt-course-page");
    var page1 = $("#focus-course-page");
    var id = tab2.attr("data-id");
    var loaded = false;

    var drawCourseItem = function (val) {
        var str = [
            '<div class="course-item" onclick="window.location.href=\'/course/view/', val.id, '/', val.resourceid, '\';">',
            '<div class="img-wrapper">',
            '<img src="http://n-course.oss-cn-beijing.aliyuncs.com/pic/', val.small_img, '" width="120" height="68">',
            '</div>',
            '<div class="course-item-intro-wrapper">',
            '<div class="c-title"><a href="/course/view/', val.id, '">', val.name, '</a></div>',
            '<div class="c-partner">', val.source, '</div>',
            '<div class="c-update-status">', val.update_status, '</div>',
            '</div>',
            '<div class="last-time">',
            '<p>', val.time, '</p>',
            '</div>',
            '</div>'
        ].join("");
        return str;
    };

    function drawCourses(courses, c) {
        var str = '';
        courses[c].forEach(function (val) {
            str += drawCourseItem(val);
        });
        return str;

    }

    var drawLearntPage = function () {
        loaded = true;

        $.get('/user/studycourse', {id: id},'json').done( function (res) {
            if(res.errno==0){
                var str = '';
                for (var c in res.data) {

                    str += [
                        '<div class="courses-wrapper">',
                        '<div class="opt-time">',
                        '<div class="txt">', c.split("-")[0], '</div>',
                        '<div class="txt">', c.split("-")[1], '/', c.split("-")[2], '</div>',
                        '</div>',
                        drawCourses(res.data, c),
                        '</div>'
                    ].join('');
                }
                page2.html(str);
                if($("#learnt-course-page .courses-wrapper").length ==0){
                    page2.addClass("empty");
                }
            }else{
                loaded = false;
                ALERT('服务异常','无法加载数据，请稍后再试');
            }


        });
    };

    tab1.click(function () {
        page2.addClass("hide");
        page1.removeClass("hide");
        tab2.removeClass("active");
        tab1.addClass("active");
    });
    tab2.click(function () {
        page1.addClass("hide");
        page2.removeClass("hide");
        tab1.removeClass("active");
        tab2.addClass("active");
        if(!loaded){
            drawLearntPage();
        }
    });
});