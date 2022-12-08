$(function () {
    $('.sc').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function () {
        var files = $(this)[0].files
        if (files.length == 0) {
            return alert('请上传图片')
        }
        var file = files[0]
        var imgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            .attr('src', imgURL)
            .cropper(options)
    })

    $('.upload').on('click', function () {
        var files = $('#file')[0].files
        if (files.length == 0) {
            return alert('请上传图片')
        }
        var dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')
        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('更新头像失败')
                }
                layui.layer.msg('更新头像成功')
                window.parent.getuser()
            }
        })
    })
})
