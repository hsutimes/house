/**
 * User        : 蒋正
 * Time        : 2018/6/1 0029 20:39
 */
$(document).ready(function () {
    var conf = {
        c_id: '1',
        w_id: '4',
        s_id: '3'
    };

    load_u_order();
    load_c_comment();
    load_w_comment();
    load_s_comment();
    load_s_order();

    $('.time-nav-links').on('click', '.time-nav-link', function () {
        $('.time-nav-link').parent().parent().find('.time-nav-link').removeClass('text-white');
        $(this).addClass('text-white');
    });

    $('.time-links').on('click', '.time-link', function () {
        $('.time-link').siblings().removeClass('text-white');
        $(this).addClass('text-white');
    });

    $('#order-info').on('click', '.delete-order', function () {
        var x = $(this), number = x.parent().parent().find('.o-number').text();
        layer.open({
            content: '是否删除编号为 ' + number + ' 的订单？',
            yes: function (index) {
                x.parent().parent().remove();
                layer.close(index);
            }
        });
    });

    $('#server-type').on('click', '.badge', function () {
        $(this).siblings().removeClass('badge-success');
        $(this).addClass('badge-success');
        get_server($(this).text());
    });

    $('#server-content').hide();
    $('#server-info').on('click', '.look-server-info', function () {
        var x = $(this), name = x.siblings('.server-name').text(), id = x.siblings('.s-id').text();
        $('#nav-title').text('服务类型 > ' + name);
        $('#server-type-info').hide();
        $('#server-content').show();
        get_work(id);
    });

    $('#back').click(function () {
        $('#nav-title').text('服务类型');
        $('#server-type-info').show();
        $('#server-content').hide();
    });

    $('#s-type').on('click', '.badge', function () {
        $(this).siblings().removeClass('badge-success');
        $(this).addClass('badge-success');
        get_s_server($(this).text());
    });

    $('#s-content').hide();
    $('#s-infos').on('click', '.look-server-work', function () {
        var x = $(this), name = x.siblings('.server-name').text(), id = x.siblings('.s-id').text();
        $('#s-nav-title').text('服务类型 > ' + name);
        $('#s-type-info').hide();
        $('#s-content').show();
        get_s_work(id);
    });

    $('#s-back').click(function () {
        $('#s-nav-title').text('服务类型');
        $('#s-type-info').show();
        $('#s-content').hide();
    });


    $('#work').on('click', '.w-tr', function () {
        var id = $(this).find('.w-id').text(), money = $(this).find('.w-money').text(),
            shop = $(this).find('.w-shop').text(), count = $(this).find('.w-count').text();
        layer.open({
            type: 1,
            area: ['30%', '50%'],
            content: '<div class="jumbotron pl-5">\n' +
            '        <p><label class="mark">订单</label><b>12138-0000020</b></p>\n' +
            '        <p><label class="mark">价格</label><b class="text-danger h3">' + money + '</b></p>\n' +
            '        <p><label class="mark">商店</label><b>' + shop + '</b></p>\n' +
            '        <p><label class="mark">已售</label><b>' + count + '</b></p>\n' +
            '    </div>'
            , btn: ['立即下单']
            , yes: function (index) {
                $.get('api/add/order', {work: id, master: conf.c_id}, function (result) {
                    if (result.status === 'success') {
                        layer.close(index);
                        layer.msg('下单成功！');
                        load_u_order();
                    }
                });
            }, cancel: function () {
                layer.msg('订单已取消！');
            }
        });
    });

    $('#u-order').on('click', '.o-comment', function () {
        var id = $(this).parent().find('.o-id').text(), money = $(this).parent().find('.o-money').text();
        layer.open({
            type: 1,
            area: ['30%', '50%'],
            content: '<div class="jumbotron pl-5">\n' +
            '        <p><label class="mark">价格:</label><b class="text-danger h3">' + money + '</b></p>\n' +
            '        <p><label class="mark">评价:</label><textarea id="customer-comment" class="layui-textarea" placeholder="评论信息"/></p>\n' +
            '    </div>'
            , btn: ['评论']
            , yes: function (index, ele) {
                var comment = $(ele).find('#customer-comment').val();
                $.get('api/update/comment', {id: id, comment: comment}, function (result) {
                    if (result.status === 'success') {
                        layer.close(index);
                        layer.msg('评价成功！');
                        load_u_order();
                        load_c_comment()
                    }
                });
            }, cancel: function () {
                layer.msg('已取消！');
            }
        });
    });

    $('#u-order').on('click', '.delete', function () {
        var id = $(this).parent().parent().find('.o-id').text(),
            number = $(this).parent().parent().find('.o-number').text();
        layer.open({
            type: 1,
            area: ['30%', '40%'],
            content: '<div class="jumbotron pl-5">\n' +
            '        <p><label class="mark">确认删除订单:</label><b>' + number + '</b></p>\n' +
            '    </div>'
            , btn: ['删除']
            , yes: function (index) {
                $.get('api/delete/order', {id: id}, function (result) {
                    if (result.status === 'success') {
                        layer.close(index);
                        layer.msg('删除成功！');
                        load_u_order();
                    }
                });
            }, cancel: function () {
                layer.msg('已取消！');
            }
        });
    });

    $.get('api/user', {id: conf.c_id}, function (result) {
        var x = result.data[0];
        $('#u-name').text(x.name);
        $('#u-age').text(x.age);
        $('#u-sex').text(x.sex);
        $('#u-role').text(x.role);
        $('#u-email').text(x.email);
        $('#u-info').text(x.info);
    });

    $.get('api/user', {id: conf.w_id}, function (result) {
        var x = result.data[0];
        $('#w-name').text(x.name);
        $('#w-age').text(x.age);
        $('#w-sex').text(x.sex);
        $('#w-role').text(x.role);
        $('#w-email').text(x.email);
        $('#w-info').text(x.info);
    });

    $.get('api/user', {id: conf.s_id}, function (result) {
        var x = result.data[0];
        $('#s-name').text(x.name);
        $('#s-age').text(x.age);
        $('#s-sex').text(x.sex);
        $('#s-role').text(x.role);
        $('#s-email').text(x.email);
        $('#s-info').text(x.info);
    });

    $.get('api/type', function (result) {
        var l = result.data.length, x;
        for (var i = 0; i < l; i++) {
            x = result.data[i];
            $('#server-type').append('<span class="badge badge-pill">' + x.name + '</span>');
            $('#s-type').append('<span class="badge badge-pill">' + x.name + '</span>');
        }
        $('#server-type').children().first().click();
        $('#s-type').children().first().click();
    });

    $.get('api/w/work', {id: conf.w_id}, function (result) {
        if (result.status === 'success') {
            var l = result.data.length, x;
            $('#w-work-info').empty();
            for (var i = 0; i < l; i++) {
                x = result.data[i];
                $('#w-work-info').append('<tr><td>' + x.id + '</td><td>' + x.money + '</td><td>' + x.name + '</td>' +
                    '<td>' + x.type + '</td><td>' + x.info + '</td>' +
                    '<td><span class="badge badge-info p-2 mx-1 my-1">修改</span>' +
                    '<span class="badge badge-danger p-2 mx-1 my-1">删除</span>' +
                    '</td></tr>');
                load_w_order(x.id);
            }
        }
    });

    $.get('api/a/user', function (result) {
        if (result.status === 'success') {
            var l = result.data.length, x;
            $('#all-users-info').empty();
            for (var i = 0; i < l; i++) {
                x = result.data[i];
                $('#all-users-info').append('<tr><td>' + x.id + '</td><td>' + x.name + '</td><td>' + x.age + '</td>' +
                    '<td>' + x.sex + '</td><td>' + x.email + '</td><td>' + x.role + '</td><td>' + x.info + '</td>' +
                    '<td>' + ftime(x.create_time.date) + '</td><td>' + ftime(x.modified_time.date) + '</td>' +
                    '<td><span class="badge badge-warning p-2 mx-2">删除</span>' +
                    '<span class="badge badge-info p-2 mx-2">修改</span>' +
                    '</td></tr>');
            }
        }
    });

    $.get('api/a/order', function (result) {
        if (result.status === 'success') {
            var l = result.data.length, x;
            $('#all-order').empty();
            for (var i = 0; i < l; i++) {
                x = result.data[i];
                $('#all-order').append('<tr><td>' + x.id + '</td><td>' + x.number + '</td><td>' + x.money + '</td>' +
                    '<td>' + x.info + '</td><td>' + x.die + '</td><td>' + x.comment + '</td><td>' + x.w_name + '</td>' +
                    '<td>' + x.s_name + '</td><td>' + x.o_master + '</td><td>' + x.w_info + '</td>' +
                    '<td>' + ftime(x.create_time.date) + '</td><td>' + ftime(x.modified_time.date) + '</td>' +
                    '<td><span class="badge badge-warning p-2 mx-2">删除</span>' +
                    '</td></tr>');
            }
        }
    });

    $.get('api/a/log', function (result) {
        if (result.status === 'success') {
            var l = result.data.length, x;
            $('#a-log').empty();
            for (var i = 0; i < l; i++) {
                x = result.data[i];
                $('#a-log').append('<tr><td>' + x.id + '</td><td>' + x.name + '</td><td>' + x.age + '</td>' +
                    '<td>' + x.sex + '</td><td>' + x.email + '</td><td>' + x.role + '</td><td>' + x.info + '</td>' +
                    '<td>' + ftime(x.create_time.date) + '</td>' +
                    '<td><span class="badge badge-warning p-2 mx-2">删除</span>' +
                    '</td></tr>');
            }
        }
    });

    $.get('api/a/sysinfo', function (result) {
        if (result.status === 'success') {
            var x = result.data[0];
            $('#u-num').text(x.u_num);
            $('#l-num').text(x.l_num);
            $('#o-num').text(x.o_num);
            $('#t-num').text(x.t_num);
            $('#s-num').text(x.s_num);
            $('#w-num').text(x.w_num);
        }
    });

    function load_c_comment() {
        $.get('api/c_comment', function (result) {
            if (result.status === 'success') {
                var l = result.data.length, x;
                $('#c_comment').empty();
                for (var i = 0; i < l; i++) {
                    x = result.data[i];
                    $('#c_comment').append('<tr><td>' + x.id + '</td><td>' + x.comment + '</td>' +
                        '<td>' + ftime(x.create_time.date) + '</td><td>' + ftime(x.modified_time.date) + '</td>' +
                        '</tr>');
                }
            }
        });
    }

    function load_w_comment() {
        $.get('api/w/comment', {id: conf.w_id}, function (result) {
            if (result.status === 'success') {
                var l = result.data.length, x;
                $('#w_comment').empty();
                for (var i = 0; i < l; i++) {
                    x = result.data[i];
                    $('#w_comment').append('<tr><td>' + x.id + '</td><td>' + x.comment + '</td>' +
                        '<td>' + ftime(x.create_time.date) + '</td><td>' + ftime(x.modified_time.date) + '</td>' +
                        '</tr>');
                }
            }
        });
    }

    function load_s_comment() {
        $.get('api/s/comment', {id: conf.s_id}, function (result) {
            if (result.status === 'success') {
                var l = result.data.length, x;
                $('#s_comment').empty();
                for (var i = 0; i < l; i++) {
                    x = result.data[i];
                    $('#s_comment').append('<tr><td>' + x.id + '</td><td>' + x.comment + '</td>' +
                        '<td>' + ftime(x.create_time.date) + '</td><td>' + ftime(x.modified_time.date) + '</td>' +
                        '</tr>');
                }
            }
        });
    }

    function load_s_order() {
        $.get('api/s/order', {id: conf.s_id}, function (result) {
            if (result.status === 'success') {
                var l = result.data.length, x;
                $('#s-order').empty();
                for (var i = 0; i < l; i++) {
                    x = result.data[i];
                    $('#s-order').append('<tr><td>' + x.id + '</td><td>' + x.number + '</td><td>' + x.money + '</td>' +
                        '<td>' + x.info + '</td><td>' + x.die + '</td><td>' + x.comment + '</td><td>' + x.w_name + '</td>' +
                        '<td>' + x.s_name + '</td><td>' + x.o_master + '</td><td>' + x.w_info + '</td>' +
                        '<td>' + ftime(x.create_time.date) + '</td><td>' + ftime(x.modified_time.date) + '</td>' +
                        '<td><span class="badge badge-warning p-2 mx-2">删除</span>' +
                        '</td></tr>');
                }
            }
        });
    }

    function load_u_order() {
        $.get('api/order', {id: conf.c_id}, function (result) {
            var l = result.data.length, x;
            $('#u-order').empty();
            for (var i = 0; i < l; i++) {
                x = result.data[i];
                $('#u-order').append('<div class="col-xl-4">' +
                    '<div class="time-card card p-3 my-3">' +
                    '<div class="care-title"><i class="float-left text-hide"></i><i class="delete float-right fa fa-close"></i></div>' +
                    '<div class="card-body">' +
                    '<p><label class="mark">id: </label><i class="o-id">' + x.id + '</i></p>' +
                    '<p><label class="mark">编号: </label><i class="o-number">' + x.number + '</i></p>' +
                    '<p><label class="mark">金钱: </label><b class="o-money">' + x.money + '</b></p>' +
                    '<p><label class="mark">信息: </label><b>' + x.info + '</b></p>' +
                    '<p><label class="mark">下单时间: </label><b>' + ftime(x.create_time.date) + '</b></p>' +
                    '<p><label class="mark">结束时间: </label><b>' + ftime(x.modified_time.date) + '</b></p>' +
                    forder(x.die) +
                    '</div>' +
                    '</div></div>');
            }
        });
    }

    function load_w_order(w_id) {
        $.get('api/w/order', {id: w_id}, function (result) {
            var l = result.data.length, x;
            for (var i = 0; i < l; i++) {
                x = result.data[i];
                $('#w-order').append('<tr><td>' + x.id + '</td><td>' + x.number + '</td><td>' + x.money + '</td>' +
                    '<td>' + x.info + '</td><td>' + x.die + '</td><td>' + x.w_name + '</td>' +
                    '<td>' + x.s_name + '</td><td>' + x.w_info + '</td>' +
                    '<td>' + ftime(x.create_time.date) + '</td><td>' + ftime(x.modified_time.date) + '</td>' +
                    '<td><span class="badge badge-warning p-2 mx-2">接单</span>' +
                    '</td></tr>');
            }
        });
    }

    function get_work(server) {
        $.get('api/c/work', {server: server}, function (result) {
            if (result.status === 'success') {
                var l = result.data.length, x;
                $('#work').empty();
                for (var i = 0; i < l; i++) {
                    x = result.data[i];
                    $('#work').append('<tr class="w-tr"><td class="w-id">' + x.id + '</td><td>' + x.info + '</td>' +
                        '<td>' + x.user + '</td><td class="w-money">' + x.money + '</td>' +
                        '<td class="w-shop">' + x.shop + '</td><td class="w-count">' + x.count + '</td>' +
                        '</tr>');
                }
            }
        });
    }

    function get_server(type) {
        $.get('api/server', {type: type}, function (result) {
            var l = result.data.length, x;
            $('#server-info').empty();
            for (var i = 0; i < l; i++) {
                x = result.data[i];
                $('#server-info').append('<div class="col-xl-4">' +
                    '<div class="time-card card p-3 my-3">' +
                    '<div class="card-title server-name">' + x.name + '</div>' +
                    '<div class="card-body">' + x.info + '</div>' +
                    '<div class="card-footer look-server-info">点击详情</div>' +
                    '<div class="s-id text-hide">' + x.id + '</div>' +
                    '</div></div>');
            }
        });
    }

    function get_s_work(server) {
        $.get('api/c/work', {server: server}, function (result) {
            if (result.status === 'success') {
                var l = result.data.length, x;
                $('#s-work').empty();
                for (var i = 0; i < l; i++) {
                    x = result.data[i];
                    $('#s-work').append('<tr class="w-tr"><td class="w-id">' + x.id + '</td><td>' + x.info + '</td>' +
                        '<td>' + x.user + '</td><td class="w-money">' + x.money + '</td>' +
                        '<td class="w-shop">' + x.shop + '</td><td class="w-count">' + x.count + '</td>' +
                        '<td><span class="badge badge-danger p-2 mx-2">删除</span>' +
                        '<span class="badge badge-success p-2 mx-2">修改</span>' +
                        '</td></tr>');
                }
            }
        });
    }

    function get_s_server(type) {
        $.get('api/server', {type: type}, function (result) {
            var l = result.data.length, x;
            $('#s-infos').empty();
            for (var i = 0; i < l; i++) {
                x = result.data[i];
                $('#s-infos').append('<div class="col-xl-4">' +
                    '<div class="time-card card p-3 my-3">' +
                    '<div class="card-title server-name">' + x.name + '</div>' +
                    '<div class="card-body">' + x.info + '</div>' +
                    '<div class="card-footer look-server-work">点击详情</div>' +
                    '<div class="s-id text-hide">' + x.id + '</div>' +
                    '</div></div>');
            }
        });
    }

    function ftime(t) {
        // yyyy-MM-dd HH:mm:ss
        if (t === null) return '';
        return new Date(t).format('yyyy-MM-dd HH:mm:ss');
    }

    function forder(die) {
        return die === 0 ? '<div class="card-footer time-card-footer o-comment">付款</div>' : '';
    }
});

Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};