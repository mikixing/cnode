import utils from './utils'

//主题首页
export function getIndex (opt = {}) {
	var page = opt.page || 1
	var limit = opt.limit || 20
	var tab = opt.tab || ''
	return utils.ajax.get('/topics', {page,limit,tab})
}

//获得文章内容
export function getContent (id) {
	var topic = '/topic/' + id
	return utils.ajax.get(topic, {mdrender: true})
}

//新建评论
export function createReply (content, topic_id, reply_id) {
	reply_id = reply_id || ' '
	var url = '/topic/' + topic_id + '/replies'
	return utils.ajax.post(url, {content: content, accesstoken: 'fd68a2d1-e032-4909-9fc0-197f2d756871', reply_id: reply_id})
}

//为评论点赞
export function doLike (reply_id) {
	var url = '/reply/' + reply_id + '/ups'
	return utils.ajax.post(url, {accesstoken: 'fd68a2d1-e032-4909-9fc0-197f2d756871'})
}
