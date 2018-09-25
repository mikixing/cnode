import utils from './utils'

//主题首页
export function getIndex (opt = {}) {
	console.log(opt)
	var page = opt.page || 1
	var limit = opt.limit || 20
	var tab = opt.tab || ''
	return utils.ajax.get('https://cnodejs.org/api/v1/topics', {page,limit,tab})
}