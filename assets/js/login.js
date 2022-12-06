// 登录页面的js文件
$(function () {
    // 给注册账号按钮添加点击事件
    $('.reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 给去登录按钮添加点击事件
    $('.login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    var layer = layui.layer

    // 定义表单校验规则
    form.verify({
        username: [
            /^[a-zA-Z0-9]{3,12}$/,
            '用户名必须为3~12位，且只能为字母、数字'
        ],
        password: [
            /^[a-zA-Z0-9|-|_|.|*]{3,12}$/,
            '密码不能为字符串，必须是3~12位'
        ],
        pwd: function (value) {
            var mm = $('.mima').val()
            if (mm != value) {
                return '密码不一致，请重新输入'
            }
        }
    })

    // 注册表单提交事件
    $('#reg-box').on('submit', function (e) {
        e.preventDefault()
        var val = $(this).serialize()
        $.post('/api/reguser', val, function (res) {
            if (res.status != 0) return layer.msg(res.message)
            layer.msg('注册成功')
            $('.login').click()
        })
    })

    // 登录表单提交事件
    $('#login-box').on('submit', function (e) {
        e.preventDefault();
        var val = $(this).serialize()
        $.post('/api/login', val, function (res) {
            if (res.status != 0) return layer.msg(res.message)
            layer.msg(res.message)
            localStorage.setItem('token', res.token)
            location.href = './index.html'
        })
    })
})