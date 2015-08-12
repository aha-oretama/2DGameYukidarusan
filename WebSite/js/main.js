(function () {
    "use strict";

    var LEFT_KEY_CODE = 37;
    var RIGHT_KEY_CODE = 39;
    var key_value = 0;

    //�v���O�����S�̂Ŏg�p����ϐ�
    var canvas = null;
    var ctx = null;
    var img_snow = null;
    var img_snow_man = null;

    // �C�x���g�n���h��
    document.addEventListener("DOMContentLoaded", function () {
        loadAssets();
    });
    document.addEventListener("keydown", function (event) {
        switch(event.keyCode){
            case LEFT_KEY_CODE:
                key_value = -3;
                break;
            case RIGHT_KEY_CODE:
                key_value = +3;
                break;
        }
    });
    document.addEventListener("keyup", function (event) {
            key_value = 0;
    })

    // �摜�ǂݍ���
    function loadAssets() {
        canvas = document.getElementById('bg');
        // �C�x���g�n���h��
        canvas.addEventListener("click", renderFrame);

        ctx = canvas.getContext('2d');
        img_snow = new Image();
        img_snow.src = '/img/snow.png';
        img_snow_man = new Image();
        img_snow_man.src = '/img/snow_man.png';

        // �摜�ǂݍ��݊������ɕ\������
        img_snow.onload = function () {
            img_snow._x = getCenterPostion(canvas.clientWidth, img_snow.width);
            img_snow._y = 0;
            ctx.drawImage(img_snow, img_snow._x, img_snow._y);
        };
        img_snow_man.onload = function () {
            img_snow_man._x = getCenterPostion(canvas.clientWidth, img_snow_man.width);
            img_snow_man._y = canvas.clientHeight - img_snow_man.height;
            img_snow_man.right_limit_position = getRightLimitPostion(canvas.clientWidth, img_snow_man.width)
            ctx.drawImage(img_snow_man, img_snow_man._x, img_snow_man._y);
        }

    }

    function renderFrame() {
        // canvas���N���A
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

        // ���t���[���`�揈��
        img_snow._y += 2;
        img_snow_man._x += key_value;

        // �t���[�������E����
        if (canvas.clientHeight < img_snow._y) {
            img_snow._y = 0;
        }
        if (img_snow_man._x > img_snow_man.right_limit_position) {
            img_snow_man._x = img_snow_man.right_limit_position;
        }
        if (img_snow_man._x < 0) {
            img_snow_man._x = 0;
        }

        ctx.drawImage(img_snow, img_snow._x, img_snow._y);
        ctx.drawImage(img_snow_man, img_snow_man._x, img_snow_man._y);

        requestId = window.requestAnimationFrame(renderFrame);
    }

    // canvas�̒���
    function getCenterPostion(containerWidth, itemWidth) {
        return (containerWidth / 2) - (itemWidth / 2);
    }

    // canvas�̉E���E
    function getRightLimitPostion(containerWidth, itemWidth) {
        return (containerWidth - itemWidth);
    }

})();