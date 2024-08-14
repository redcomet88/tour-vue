import request from '@/api/request'

// 排名前十的景点
export function getCommentsRank() {
    return request({
        url:  '/commentsRank',
        method: 'get'
    })
}

// 按照城市排名
export function getCityRank() {
    return request({
        url:  '/cityRank',
        method: 'get'
    })
}

// 按照评分排名
export function getScoreRank() {
    return request({
        url:  '/scoreRank',
        method: 'get'
    })
}

export function  tours(title,page=1,limit=10){
    return request({
        url:  '/tours',
        method: 'get',
        params: {title, page, limit}
    })
}

export function  addTour(data){
    return request({
        url:  '/tour',
        method: 'post',
        data
    })
}

// 修改现有景点
export function updateTour(id, data) {
    return request({
        url: `/tour/${id}`,
        method: 'put',
        data
    });
}

// 删除景点
export function deleteTour(id) {
    return request({
        url: `/tour/${id}`,
        method: 'delete'
    });
}
