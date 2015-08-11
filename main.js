(function () {
    "use strict";

    //�v���O�����S�̂Ŏg�p����ϐ�
    var canvas = null;
    var ctx = null;
    var img_snow = null;
    var img_snow_man = null;

    // �C�x���g�n���h��
    document.addEventListener("DOMContentLoaded", function () {
        loadAssets();
    });

    // �摜�ǂݍ���
    function loadAssets() {
        canvas = document.getElementById('bg');
        ctx = canvas.getContext('2d');
        img_snow = new Image();
        img_snow.src = '/img/snow.png';

        // �摜�ǂݍ��݊������ɕ\������
        img_snow.onload = function () {
            ctx.drawImage(img_snow, 0, 0);
        };
    }
    //���̒��ɃR�[�h���L�q���Ă���
})();