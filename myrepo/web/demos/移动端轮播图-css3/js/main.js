window.addEventListener('load', () => {
    // 获取元素及一些参数
    let ul = document.getElementsByTagName('ul')[0];
    let ulLength = ul.getElementsByTagName('li').length;
    let liWidth = ul.getElementsByTagName('li')[0].offsetWidth;
    let ol = document.getElementsByTagName('ol')[0];
    let pointWidth = 20;
    // 拼接前后图片，最后一张加到开头，第一张加到结尾
    let firstImg = ul.firstElementChild.cloneNode(true);
    let lastImg = ul.lastElementChild.cloneNode(true);
    ul.insertBefore(lastImg, ul.children[0]);
    ul.appendChild(firstImg);
    // 动态设置ul的宽度
    ul.style.width = '' + liWidth * (ulLength + 2) + 'px';
    //动态添加指示器节点
    let str = '';
    for (let i = 0; i < ulLength; i++) {
        str += '<li></li>'
    }
    ol.innerHTML = str;
    let lis = ol.getElementsByTagName('li');
    lis[0].className = 'current';
    ol.style.width = '' + ulLength * pointWidth + 'px';
    ol.style.marginLeft = '' + -ulLength * pointWidth / 2 + 'px';
    // css3动画函数
    let addTransition = (obj) => {
        obj.style.transaction = 'all .2s ease';
        obj.style.webkitTransition = 'all .2s ease';

    };
    let removeTransition = (obj) => {
        obj.style.transaction = '';
        obj.style.webkitTransition = '';
    };
    let changeTranslateX = (obj, x) => {
        obj.style.transform = `translateX(${x}px)`;
        obj.style.webkitTransform = `translateX(${x}px)`
    };
    /**
     * 下标移动函数
     */
    let changeIndex = () => {
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        liIndex = index;
        if (index >= ulLength + 1) { //6
            liIndex = 1
        } else if (index <= 0) {
            liIndex = ulLength
        }
        lis[liIndex - 1].className = 'current';
    };
    /**
     * 自动轮播函数
     */
    let autoPlay = () => {
        // 图片移动
        index++;
        addTransition(ul);
        changeTranslateX(ul, -index * liWidth);
        // 指示器移动
        changeIndex()
    };
    let index = 1;
    let liIndex = 1;
    let timer = null;
    timer = setInterval(autoPlay, 1000);
    // 边界值处理
    ul.addEventListener('webkitTransitionEnd', () => {
        // 最大边界值处理，无需处理最小边界值
        if (index >= ulLength + 1) {   //6
            index = 1;
        } else if (index <= 0) {
            index = ulLength;      //5
        }
        removeTransition(ul);
        changeTranslateX(ul, -liWidth * index)
    });
    let startX = 0;
    let endX = 0;
    let distanceX = 0;
    ul.addEventListener('touchstart', (e) => {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    ul.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
        distanceX = startX - endX;
        removeTransition(ul);
        changeTranslateX(ul, -index * liWidth - distanceX)
    });
    ul.addEventListener('touchend', (e) => {
        if (Math.abs(distanceX) > 1 / 3 * liWidth && endX !== 0) {
            if (distanceX > 0) {
                index++
            } else if (distanceX < 0) {
                index--
            }
        }
        addTransition(ul);
        changeTranslateX(ul, -index * liWidth);
        changeIndex();
        timer = setInterval(autoPlay, 1000);
        startX = 0;
        endX = 0;
        distanceX = 0;
    })
});