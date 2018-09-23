export const formatTime = time => {
	var createTime = new Date(time).getTime()
	var nowTime = new Date().getTime()
	var diff = nowTime - createTime
	var tmp = Math.floor(diff / 1000)

	if (tmp < 1) {
		return '1秒前'
	} else if (tmp >= 1 && tmp < 60) {
		return tmp + '秒前'
	} else if (tmp >= 60) {
		tmp = Math.floor(tmp / 60)
		if (tmp < 60)  {
			return tmp + '分前'
		} else {
			tmp = Math.floor(tmp / 60)
			if (tmp < 24) {
				return tmp + '小时前'
			} else {
				tmp = Math.floor(tmp / 24)
				if (tmp < 30) {
					return tmp + '天前'
				} else {
					tmp = Math.floor(tmp / 30)
					if (tmp < 12) {
						return tmp + '月前'
					} else {
						tmp = Math.floor(tmp / 12)
						return tmp + '年前'
					}
				}
			}
		}
	}
}
 export const tab = opt => {
 	if (opt.top) {
 		return '置顶'
 	} else if (opt.good) {
 		return '精华'
 	}else if (opt.tab === 'share') {
 		return '分享'
 	} else if (opt.tab === 'ask') {
 		return '问答'
 	}
 }