$(function () {

    getuser()
    $('.tc').on('click', function () {
        layui.layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')

            location.href = './login.html'
            layer.close(index);
        });
    })
})
function getuser() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function (res) {
            if (res.status != 0) return layui.layer.msg('获取用户信息失败')
            $('body').show()
            xrimg(res.data)
        }
    })
}
function xrimg(dt) {
    var nameStr = dt.nickname || dt.username

    $('.hello span').html(nameStr)
    if (dt.user_pic == null) {
        if (dt.nickname != '') {
            var str = dt.nickname[0].substr(0, 1)
            $('.tx').html(str)
            $('.tx-info').html(str)
        } else {
            var str = dt.username[0].toUpperCase()
            $('.tx').html(str)
            $('.tx-info').html(str)
        }

    } else {
        $('.tx').hide()
        $('.tx-img').show()
        $('.tx-info').hide()
        $('.tx-img').attr('src', dt.user_pic)
    }

}