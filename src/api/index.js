import axios from 'axios'
const serverUrl = 'http://guyuefangxuan.top'

export function search (key) {
  let url = serverUrl + '/search?keywords=' + key
  return axios({
    method: 'get',
    url: url
  })
    .then(function (res) {
      if (res.data.code === 200) {
        return res.data.result.songs
      }
    })
}

export function getHot () {
  return axios({
    method: 'get',
    url: serverUrl + '/search/hot'
  })
    .then(function (res) {
      if (res.data.code === 200) {
        return res.data.result.hots
      }
    })
}

export function musicDetail (id) {
  let url = serverUrl + '/song/detail?ids=' + id
  return axios({
    method: 'get',
    url: url
  })
    .then(function (res) {
      if (res.data.code === 200) {
        return res.data.songs
      }
    })
}

export function musicUrl (id) {
  let url = serverUrl + '/song/url?id=' + id
  return axios({
    method: 'get',
    url: url
  })
    .then(function (res) {
      if (res.data.code === 200) {
        return res.data.data[0].url
      }
    })
}

export function getLyric (id) {
  let url = serverUrl + '/lyric?id=' + id
  return axios({
    method: 'get',
    url: url
  })
    .then(function (res) {
      if (res.data.code === 200) {
        return res.data.lrc.lyric
      }
    })
}

export function getBanner () {
  return axios({
    method: 'get',
    url: serverUrl + '/banner'
  })
    .then(function (res) {
      let imgres = JSON.parse(res.request.response)
      if (imgres.code === 200) {
        return imgres.banners
      } else {
        return []
      }
    })
}

export function commendSongSheet () {
  return axios({
    method: 'get',
    url: serverUrl + '/personalized'
  })
    .then(function (res) {
      return res.data.result
    })
}

export function songSheetDetail (id) {
  return axios({
    method: 'get',
    url: serverUrl + '/playlist/detail?id=' + id
  })
    .then(function (res) {
      return res
    })
}

export function login (method, num, password) {
  if (method === 'cellphone') {
    return axios({
      method: 'get',
      url: serverUrl + `/login/cellphone?phone=${num}&password=${password}`
    })
      .then(function (res) {
        return res.data
      })
  } else if (method === 'email') {
    return axios({
      method: 'get',
      url: serverUrl + `/login?email=${num}@163.com&password=${password}`
    })
      .then(function (res) {
        return res.data
      })
  }
}

export function rank (key) {
  return axios({
    method: 'get',
    url: serverUrl + '/top/list?idx=' + key
  })
    .then(function (res) {
      return res.data.playlist
    })
}

export function playhistory (id) {
  return axios({
    method: 'get',
    url: serverUrl + '/user/record?uid=' + id + '&type=1'
  })
    .then(function (res) {
      return res.data.weekData
    })
}

export function getAllSheet (limit, before) {
  let url = serverUrl + '/top/playlist/highquality'
  if (limit) {
    url = url + '?limit=' + limit
  } else {
    url = url + '?limit=20'
  }
  if (before) {
    url = url + '&before=' + before
  }
  return axios({
    method: 'get',
    url: url
  })
    .then(function (res) {
      return res.data
    })
}
