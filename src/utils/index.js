//lazyLoad
var clock
var count = 0
function lazyLoad () {
	window.onscroll = function () {
		if (clock) {
			clearTimeout(clock)
		}
		clock = setTimeout(function () {
			checkShow()
		}, 200)
	}
	checkShow()
}
function checkShow () {
	var imgs = [].slice.call(document.getElementsByClassName('lazyload'))
	imgs.forEach( img => {
		if (img.isLoaded) {
			return
		}
		if (shouldShow(img)) {
			showImg(img)
		}
	})
}
function shouldShow (img) {
	var clientH = document.documentElement.clientHeight
	var scrollT = document.documentElement.scrollTop
	var offsetT = offsetP(img)

	if (offsetT <= clientH + scrollT) {
		return true
	} else {
		return false
	}
}
function showImg (img) {
	count++
	console.log(count)
	var url = img.getAttribute('data-url')
	img.setAttribute('src', url)
	img.isLoaded = true
}
function offsetP (ele) {
	var result = 0
	var e = ele
	do {
		result += e.offsetTop
		e = e.offsetParent
	} while (e)
	return result
}

export default {
	lazyLoad
}