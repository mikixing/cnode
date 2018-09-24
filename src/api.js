import utils from './utils'

//主题首页
export function getIndex () {
	return utils.ajax.get('https://cnodejs.org/api/v1/topics', {page: 1, tab: 'ask', limit: 20})
}