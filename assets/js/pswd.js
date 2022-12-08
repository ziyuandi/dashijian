$(function () {
    var form = layui.form
    form.verify({

        password: [
            /^[a-zA-Z0-9|-|_|.|*]{3,12}$/,
            '密码不能为字符串，必须是3~12位'
        ],
        pswd: function (value) {
            var val = $('.jmm').val()
            if (val == value) return '新密码不能和旧密码相同'
        },
        pwd: function (value) {
            var mm = $('.xmm').val()
            if (mm != value) {
                return '密码不一致，请重新输入'
            }
        }
    })

    $('form').on('submit', function (e) {
        e.preventDefault();
        var val = $(this).serialize()
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: val,
            success: function (res) {
                if (res.status != 0) return layui.layer.msg(res.message)
                layui.layer.msg('更新密码成功')
                localStorage.removeItem('token')
                window.parent.location.href = "/login.html"
            }
        })
    })
})