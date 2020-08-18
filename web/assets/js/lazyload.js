var imgs = document.querySelectorAll('img');

//offsetTop是元素与offsetParent的距离，循环获取直到页面顶部
function getTop(e) {
	var T = e.offsetTop;
	while(e = e.offsetParent) {
T += e.offsetTop;
	}
	return T;
}

function isSupportWebp() {
	try {
		return document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0;
	} catch(err) {
		return false;
	}
}

function lazyLoad(imgs) {
	var H = document.documentElement.clientHeight;//获取可视区域高度
	var S = document.documentElement.scrollTop || document.body.scrollTop;
	for (var i = 0; i < imgs.length; i++) {
		if (H + S > getTop(imgs[i])) {
			if((imgs[i].getAttribute('data-src-webp')!=null)&&imgs[i].getAttribute('data-src')!=null){
				if(isSupportWebp())
					imgs[i].src = imgs[i].getAttribute('data-src-webp');
				else
					imgs[i].src = imgs[i].getAttribute('data-src');
			}
		}
	}
}

window.onload = window.onscroll = function () { //onscroll()在滚动条滚动的时候触发
	lazyLoad(imgs);
}