(function () {
    "use strict";

    var LEFT_KEY_CODE = 37;
    var RIGHT_KEY_CODE = 39;
    var SCREEN_DIVS = 10;
    var snows = [];
    var snow_man_ob = null;

    var SNOW_INCREMENT = 3;
    var SNOW_INCREMENT_HEIGHT = 100;

    // ��I�u�W�F�N�g
    var snow = function (){
        var img = new Image();
        img.src = SNOW_IMAGE_SRC[0];

        var x,y,underLimitPostion,rightLimitPostion;
        var speed = 2;

        // ��̏����ʒu
        this.setInitialPosition = function(containerWidth,containerHeight) {
            underLimitPostion = containerHeight;
            rightLimitPostion = containerWidth - img.width
            x = getRandomPostion(rightLimitPostion);
            y = 0;
        }

        this.move = function(){
            y = y + speed;
            if (y > underLimitPostion) {
                x = getRandomPostion(rightLimitPostion);
                y = 0;
                img.src = SNOW_IMAGE_SRC[0];
            }
        }

        // �摜�\��
        this.draw = function(ctx) {
//            img.onload = function () {
                ctx.drawImage(img, x, y);
//            };
        }

        // �摜�ύX
        this.doHit = function () {
            img.src = SNOW_IMAGE_SRC[1];
        }

        this.getX = function () {
            return x;
        }
        this.getY = function () {
            return y;
        }
        this.getWidth = function () {
            return img.width;
        }
        this.getHeight = function () {
            return img.height;
        }
    }

    // ��_���}�I�u�W�F�N�g
    var snow_man = function(){
        var img = new Image();
        img.src = '/img/snow_man.png';

        var x,y,right_limit_position;
        var speed = 3;

        this.initialize = function(containerWidth,containerHeight){
            x = getCenterPostion(containerWidth, img.width);
            y = containerHeight - img.height;
            right_limit_position = getRightLimitPostion(containerWidth, img.width)
        }

        this.move = function (value) {
            x += value * speed;
            if (x < 0) {
                x = 0
            }
            if (x > right_limit_position) {
                x = right_limit_position;
            }
        }

        this.draw = function (ctx) {
//            img.onload = function () {
                ctx.drawImage(img, x, y);
//            };
        }

        this.getX = function () {
            return x;
        }
        this.getY = function () {
            return y;
        }
        this.getWidth = function () {
            return img.width;
        }
        this.getHeight = function () {
            return img.height;
        }
    }

    var SNOW_IMAGE_SRC = new Array();
    SNOW_IMAGE_SRC[0] = '/img/snow.png';
    SNOW_IMAGE_SRC[1] = '/img/sp_snow1.png';
    SNOW_IMAGE_SRC[2] = '/img/sp_snow2.png';
    SNOW_IMAGE_SRC[3] = '/img/sp_snow3.png';

    var key_value = 0;

    //�v���O�����S�̂Ŏg�p����ϐ�
    var canvas = null;
    var ctx = null;

    // �C�x���g�n���h��
    document.addEventListener("DOMContentLoaded", function () {
        loadAssets();
    });
    document.addEventListener("keydown", function (event) {
        switch(event.keyCode){
            case LEFT_KEY_CODE:
                key_value = -1;
                break;
            case RIGHT_KEY_CODE:
                key_value = +1;
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

        var snow_ob = new snow();
        snow_ob.setInitialPosition(canvas.clientWidth,canvas.clientHeight);
        snows.push(snow_ob);

        snow_man_ob = new snow_man();
        snow_man_ob.initialize(canvas.clientWidth, canvas.clientHeight);

        // �摜�\��
        for (var i = 0; i < snows.length ; i++){
            snows[i].draw(ctx);
        }
        snow_man_ob.draw(ctx);

    }

    function renderFrame() {
        // canvas���N���A
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

        // ��̖��t���[���`�揈��
        var snow_increment_flg = true;
        for (var i = 0; i < snows.length; i++) {
            snows[i].move();
            if (isHit(snows[i], snow_man_ob)) {
                // HIT�̕\��
                ctx.font = "bold 20px '�l�r �S�V�b�N'";
                ctx.fillStyle = "red";
                ctx.fillText("HIT", getCenterPostion(canvas.clientWidth, 140), 160);

                snows[i].doHit();
            }

            if (snows[i].getY() < SNOW_INCREMENT_HEIGHT) {
                snow_increment_flg = false;
            }
        }
        if (snow_increment_flg) {
            var snow_ob = new snow();
            snow_ob.setInitialPosition(canvas.clientWidth, canvas.clientHeight);
            snows.push(snow_ob);
        }

        // ��_������̖��t���[���`�揈��
        snow_man_ob.move(key_value);

        // �摜�\��
        for (var i = 0; i < snows.length ; i++) {
            snows[i].draw(ctx);
        }
        snow_man_ob.draw(ctx);

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

    function getRandomPostion(width) {
        return width * Math.floor(Math.random(Date.now()) * (SCREEN_DIVS + 1)) / SCREEN_DIVS;
    }

    // �����蔻��
    function isHit(targetA,targetB) {
        return (((targetA.getX() <= targetB.getX() && targetA.getWidth() + targetA.getX() >= targetB.getX())
            || (targetA.getX() >= targetB.getX() && targetB.getX() + targetB.getWidth() >= targetA.getX()))
            && ((targetA.getY() <= targetB.getY() && targetA.getHeight() + targetA.getY() >= targetB.getY())
                || (targetA.getY() >= targetB.getY() && targetB.getY() + targetB.getHeight() >= targetA.getY())));
    }

})();