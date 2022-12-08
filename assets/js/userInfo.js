$(function () {
    var form = layui.form

    // 定义表单校验规则
    form.verify({
        username: [
            /^[\S]{3,12}$/,
            '用户昵称非空格,3~12位'
        ],


    })

    initUser()


    function initUser() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function (res) {
                if (res.status != 0) return layui.layer.msg('获取用户信息失败')
                //给表单赋值
                layui.form.val("formTest", res.data);
            }
        })
    }
    $('.reset').on('click', function (e) {
        e.preventDefault();
        initUser()
    })

    $('form').on('submit', function (e) {
        e.preventDefault()
        var val = $(this).serialize()
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: val,
            success: function (res) {
                if (res.status != 0) return layui.layer.msg('更新用户信息失败')
                layui.layer.msg('更新用户信息成功')
                window.parent.getuser()
            }
        })
    })
})
