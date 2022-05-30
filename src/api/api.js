import axios from "axios";

const baseURL = '/api'
export const getConfig = function () {
    return {
        baseURL: '/api',
        headers: {
            contentType: 'application/json',
            authorization: sessionStorage.getItem("token"),
        }
    }
}

/**
 * @description 获取用户信息
 * @param {*} payLoad 
 * @returns 
 */
export function getUserInfo(payLoad = {}) {
    return axios.post('/user/info', payLoad, getConfig())
}
/**
 * @description 修改用户信息
 * @param {*} payLoad 
 * @returns 
 */
export function getUpdata(payLoad = {}) {
    return axios.post('/user/update', payLoad, getConfig())
}
/**
 * @description  注册接口
 * @param  payLoad 
 * @returns 
 */
export function registerApi(payLoad = {}) {
    return axios.post('/user/register', payLoad, getConfig())
}
/**
 * @description 登录接口
 * 
 * @param payLoad
 * @param payLoad.username  获取用户名
 * @param payLoad.password  获取密码
 * @param payLoad.captcha   获取验证码
 */
export function loginApi(payLoad = {}) {
    return axios.post('/user/login', payLoad, getConfig())
}
/**
 * @description 退出登录接口
 * @param {*} payLoad 
 * @returns 
 */
export function logoutAPi(payLoad = {}) {
    return axios.post('/user/logout', payLoad, getConfig())
}

/**
 * @description 验证码
 * @returns 
 */
export function getCaptchaApi() {
    return `${baseURL}/captcha?` + Math.random();
}
/**
 * @description 查询题库列表
 * @param payLoad
 * @param {*} payLoad.type
 * @param {*} payLoad.pagination
 * @param {*} payLoad.pageSize 
 * @param {*} payLoad.pageNum
 */
export function topicbankApi(payLoad = {}) {
    return axios.post('/question/list', payLoad, getConfig())
}
/**
 * @description 创建题
 * @param payLoad.
 * @param   payLoad.type//题目类型
 * @param   payLoad.title //题目标题
 * @param   payLoad.questionA  // 选项a,
 * @param   payLoad.questionB  // 选项b,
 * @param   payLoad.questionC  // 非必填 选项c,
 * @param   payLoad.questionD  // 非必填 选项d,
 * @param   payLoad.answer    // 答案
 * @param   payLoad.level   // 难度系数  1：简单  2：普通 3：困难
 */
export function createQuestionsApi(payLoad = {}) {
    return axios.post('/question/create', payLoad, getConfig())
}
/**
 * @description 修改题
 * @param payLoad.
 * @param   payLoad.id//题目id
 * @param   payLoad.type//题目类型
 * @param   payLoad.title //题目标题
 * @param   payLoad.questionA  // 选项a,
 * @param   payLoad.questionB  // 选项b,
 * @param   payLoad.questionC  // 非必填 选项c,
 * @param   payLoad.questionD  // 非必填 选项d,
 * @param   payLoad.answer    // 答案
 * @param   payLoad.level   // 难度系数  1：简单  2：普通 3：困难
 */
export function modifyQuestionsApi(payLoad = {}) {
    return axios.post('/question/update', payLoad, getConfig())
}
/**
 * @description 删除题库列表

 */
export function deleteQuestionsApi(payLoad = {}) {
    return axios.post('/question/delete', payLoad, getConfig())
}
/**
 * @description 增加记事簿
 * @param
 * @param  payLoad.content:<string>, //记事薄内容
 * @param  payLoad.progress:<number>, //进度  默认是0 最大填 100  指的是当前工作任务的进度；
 */
export function addDiaryApi(payLoad = {}) {
    return axios.post('/diary/create', payLoad, getConfig())
}
/**
 * @description 创建任务
 * @param
 * @param  payLoad.name:<string>, //任务名称
 * @param  payLoad.desc:<string>, //任务描述
 * @param  payLoad.duration<int>  //任务时长
      
 */
export function getTaskCreate(payLoad = {}) {
    return axios.post('/task/create', payLoad, getConfig())
}
/**
 * @description 发布任务
 * @param
 * @param  payLoad.userId:<array[<number>]>,  //用户id，  如果给多个人发送任务，可以传数组，数组中是每一个人的id； 
 * @param  payLoad.taskId:number,  //任务id   
      
 */
export function getPublishtask(payLoad = {}) {
    return axios.post('/task/release', payLoad, getConfig())
}
/**
 * @description 查询任务列表
 * @param
 * @param  payLoad.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页; 
 * @param  payLoad.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param  payLoad.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；

 */
export function getTasklist(payLoad = {}) {
    return axios.post('/task/list', payLoad, getConfig())
}
/**
 * @description 查询用户信息列表
 * @param
 * @param  payLoad.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
 * @param  payLoad.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param  payLoad.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；

 */
export function getUserlist(payLoad = {}) {
    return axios.post('/user/list', payLoad, getConfig())
}
/**
 * @description 创建角色
 * @param
 * @param  payLoad.roleName:<string>, //角色名字
 * @param  payLoad.groupId :<number>,  //分组id
 */
export function getRoleCreateApi(payLoad = {}) {
    return axios.post('/role/create', payLoad, getConfig())
}
/**
 * @description 创建分组
 * @param
 * @param  payLoad.groupName:<string>, //分组名字
 */
export function getRoleGroupCreateApi(payLoad = {}) {
    return axios.post('/roleGroup/create', payLoad, getConfig())
}
/**
 * @description 角色列表
 * @param
 * @param  payLoad.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
 * @param  payLoad.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param  payLoad.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；

 */
export function getRoleListApi(payLoad = {}) {
    return axios.post('/role/list', payLoad, getConfig())
}
/**
 * @description 角色分组列表
 * @param
 * @param  payLoad.pagination : <boolean>,    //非必填  表示是否需要分页  如果传 false：不分页   true:分页   默认不传是分页;
 * @param  payLoad.pageSize   : <number>,     //非必填  每页获取几条数据  如果不传 默认是获取10条；
 * @param  payLoad.pageNum    : <number>,     //非必填  想获取第几页的数据  如果不传 默认是第1页；

 */
export function getRoleGroupListApi(payLoad = {}) {
    return axios.post('/roleGroup/list', payLoad, getConfig())
}
/**
 * @description 查询任务详情
 * @param
 * @param  payLoad.taskId : <number>,    //任务id

 */
export function getTaskdetailApi(payLoad = {}) {
    return axios.post('/task/detail', payLoad, getConfig())
}

