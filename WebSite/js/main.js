(function () {
    "use strict";

    var LEFT_KEY_CODE = 37;
    var RIGHT_KEY_CODE = 39;
    var SCREEN_DIVS = 10;
    var SNOW_IMAGE_SRC = new Array();
    SNOW_IMAGE_SRC[0] = '/img/snow.png';
    SNOW_IMAGE_SRC[1] = '/img/sp_snow1.png';
    SNOW_IMAGE_SRC[2] = '/img/sp_snow2.png';
    SNOW_IMAGE_SRC[3] = '/img/sp_snow3.png';

    var key_value = 0;

    //プログラム全体で使用する変数
    var canvas = null;
    var ctx = null;
    var img_snow = null;
    var img_snow_man = null;

    // イベントハンドラ
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

    // 画像読み込み
    function loadAssets() {
        canvas = document.getElementById('bg');
        // イベントハンドラ
        canvas.addEventListener("click", renderFrame);

        ctx = canvas.getContext('2d');
        img_snow = new Image();
        img_snow.src = SNOW_IMAGE_SRC[0];
        img_snow._count = 0;
        img_snow_man = new Image();
        img_snow_man.src = '/img/snow_man.png';

        // 画像読み込み完了時に表示する
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
        // canvasをクリア
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

        // 毎フレーム描画処理
        img_snow._y += 2;
        img_snow_man._x += key_value;

        // フレーム内限界判定
        if (canvas.clientHeight < img_snow._y) {
            img_snow = new Image();
            img_snow.src = SNOW_IMAGE_SRC[0];
            img_snow._count = 0;
            img_snow._x = getInitialXPosition(canvas.clientWidth, img_snow.width );
            img_snow._y = 0;
        }
        if (img_snow_man._x > img_snow_man.right_limit_position) {
            img_snow_man._x = img_snow_man.right_limit_position;
        }
        if (img_snow_man._x < 0) {
            img_snow_man._x = 0;
        }

        if (isHit(img_snow, img_snow_man)) {
            doHit();
        }

        ctx.drawImage(img_snow, img_snow._x, img_snow._y);
        ctx.drawImage(img_snow_man, img_snow_man._x, img_snow_man._y);

        requestId = window.requestAnimationFrame(renderFrame);
    }

    // canvasの中央
    function getCenterPostion(containerWidth, itemWidth) {
        return (containerWidth / 2) - (itemWidth / 2);
    }

    // canvasの右限界
    function getRightLimitPostion(containerWidth, itemWidth) {
        return (containerWidth - itemWidth);
    }

    // 当たり判定
    function isHit(targetA,targetB) {
        return (((targetA._x <= targetB._x && targetA.width + targetA._x >= targetB._x)
            || (targetA._x >= targetB._x && targetB._x + targetB.width >= targetA._x)) 
            && ((targetA._y <= targetB._y && targetA.height + targetA._y >= targetB._y)
                || (targetA._y >= targetB._y && targetB._y + targetB.height >= targetA._y)));
    }

    // 雪の初期位置
    function getInitialXPosition(containerWidth, itemWidth) {
        return (containerWidth - itemWidth) * Math.floor(Math.random(Date.now()) * (SCREEN_DIVS+1))/ SCREEN_DIVS;
    }

    function doHit() {
        // HITの表示
        ctx.font = "bold 20px 'ＭＳ ゴシック'";
        ctx.fillStyle = "red";
        ctx.fillText("HIT", getCenterPostion(canvas.clientWidth, 140), 160);

        if (img_snow._count != 3) {
            changeImage();
        }
    }

    function changeImage() {
        var temp_x = img_snow._x;
        var temp_y = img_snow._y;
        var temp_count = img_snow._count;
        img_snow = new Image();
        switch (temp_count) {
            case 0:
                img_snow.src = SNOW_IMAGE_SRC[1];
                img_snow._count = 1;
                break;
            case 1:
                img_snow.src = SNOW_IMAGE_SRC[2];
                img_snow._count = 2;
                break;
            case 2:
                img_snow.src = SNOW_IMAGE_SRC[3];
                img_snow._count = 3;
                break
        }
        img_snow._x = temp_x;
        img_snow._y = temp_y;
    }

})();