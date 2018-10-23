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
export function createReply (opt) {
	var content = opt.content || ''
	var reply_id = opt.reply_id || ''
	var url = '/topic/' + opt.topic_id + '/replies'
	var accesstoken = opt.accesstoken
	return utils.ajax.post(url, {content: content, accesstoken: accesstoken, reply_id: reply_id})
}

//为评论点赞
export function doLike (reply_id, accesstoken) {
	var url = '/reply/' + reply_id + '/ups'
	return utils.ajax.post(url, {accesstoken: accesstoken})
}
