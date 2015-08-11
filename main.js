(function () {
    "use strict";

    //プログラム全体で使用する変数
    var canvas = null;
    var ctx = null;
    var img_snow = null;
    var img_snow_man = null;

    // イベントハンドラ
    document.addEventListener("DOMContentLoaded", function () {
        loadAssets();
    });

    // 画像読み込み
    function loadAssets() {
        canvas = document.getElementById('bg');
        ctx = canvas.getContext('2d');
        img_snow = new Image();
        img_snow.src = '/img/snow.png';

        // 画像読み込み完了時に表示する
        img_snow.onload = function () {
            ctx.drawImage(img_snow, 0, 0);
        };
    }
    //この中にコードを記述していく
})();