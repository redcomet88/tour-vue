import request from '@/api/request'

// 登录
export function login(data) {
    return request({
        url:  '/login',
        method: 'post',
        data
    })
}

// 注册
export function register(data) {
    return request({
        url:  '/register',
        method: 'post',
        data
    })
}

// 获取用户列表，分页
export function  users(username,page=1,limit=10){
    return request({
        url:  '/users',
        method: 'get',
        params: {username, page, limit}
    })
}

// 获取单个用户
export function  get_one(id){
    return request({
        url: `/user/${id}`,
        method: 'get'
    })
}


// 添加用户
export function  addUser(data){
    return request({
        url:  '/user',
        method: 'post',
        data
    })
}

// 修改现有用户
export function updateUser(id, data) {
    return request({
        url: `/user/${id}`,
        method: 'put',
        data
    });
}

// 删除用户
export function deleteUser(id) {
    return request({
        url: `/user/${id}`,
        method: 'delete'
    });
}
