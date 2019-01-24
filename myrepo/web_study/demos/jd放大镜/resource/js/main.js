window.onload = function () {


    var prevBtn = document.querySelector('#prev');
    var nextBtn = document.querySelector('#next');

    var lis = document.querySelectorAll('.view_s_box li');
    var ul = document.querySelector('.view_s_box ul');

    if (lis.length > 5){
        prevBtn.onclick = function () {

        };

        nextBtn.onclick = function () {
            startMove(ul, {'left':228})
        };

        prevBtn.onmouseover = function () {
            if (!hasClass(this, 'disabled')){
                addClass(this, 'hover');
            }
        };

        prevBtn.onmouseout = function(){
            removeClass(prevBtn, 'hover')
        };

        nextBtn.onmouseover = function () {
            if (!hasClass(this, 'disabled')){
                addClass(this, 'hover');
            }
        };
        nextBtn.onmouseout = function(){
            removeClass(nextBtn, 'hover')
        };

    }else {
        addClass(prevBtn, 'disabled');
        addClass(nextBtn, 'disabled');
    }



};