

function init() {
  var liList = $('headNavBar').getElementsByTagName('li');
  for (var i = 0; i < liList.length; i++) {
    liList[i].onclick = function (e) {
      if (this["dataset"].scrolltarget === undefined) {
        return;
      }
      // 滚动
      var scrollTargetId = this["dataset"].scrolltarget;
      var scrollTargetPoint = $(scrollTargetId).offsetTop - 80 // 目标点
      var currentPoint = window.scrollY;     // 当前点
      var distance = scrollTargetPoint - currentPoint;  // 距离
      autoScrollAnimate(currentPoint, scrollTargetPoint, distance);

      currentPositionLi.classList.remove('active');
      currentPositionLi = this;
      this.classList.add('active');

    }
  }
}

window.onload = function () {
  currentPositionLi = $('headNavBar').getElementsByClassName('active')[0];
  // 加载动画
  setTimeout(function () {
    $('welcome').classList.add('hide');
    scroll();
  }, 1000)
  // 初始化
  init();

  // 事件监听
  window.onscroll = function () {
    scroll();
  };
}

function scroll() {
  window.scrollY > 0 ? $('headerTop').classList.add('active') : $('headerTop').classList.remove('active'); // 头部导航栏状态      
  var allPosition = [].slice.call(document.querySelectorAll('[data-enten]')); // 标记过动画元素
  var minElement = allPosition[0];
  for (var i = 0; i < allPosition.length; i++) {
    minElement = getTop(allPosition[i]) > getTop(minElement) ? minElement : allPosition[i]; // 距离最近的元素
    if (window.innerHeight - getTop(allPosition[i]) > 150) {
      allPosition[i].classList.remove('data-enten');
      if (allPosition[i].id === 'skills') {
        var allBar = allPosition[i].getElementsByClassName('progress');
        for (var aI = 0; aI < allBar.length; aI++) {
          allBar[aI].removeAttribute('data-progress');
        }
      }
    }
  }
  currentPositionLi.classList.remove('active');
  var newPositionLi = $('headNavBar').querySelector('[data-scrollTarget=' + minElement.id + ']');
  newPositionLi.classList.add('active');
  currentPositionLi = newPositionLi

}
/***tween***/
function autoScrollAnimate(currentPoint, targetPoint, distance) {
  function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
  }
  requestAnimationFrame(animate);

  var coords = { x: currentPoint };
  var tween = new TWEEN.Tween(coords)
    .to({ x: targetPoint }, Math.abs(distance))
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function () {
      window.scrollTo(0, coords.x)
    })
    .start();
}

// 公用函数
function getTop(el) {
  return Math.abs(el.getBoundingClientRect().top);
}
function $(id) {
  return document.getElementById(id);
}