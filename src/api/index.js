import axios from 'axios'

export function search (key) {
  let url = 'http://localhost:3000/search?keywords=' + key
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
    url: 'http://localhost:3000/search/hot'
  })
    .then(function (res) {
      if (res.data.code === 200) {
        return res.data.result.hots
      }
    })
}

export function musicDetail (id) {
  let url = 'http://localhost:3000/song/detail?ids=' + id
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
  let url = 'http://localhost:3000/song/url?id=' + id
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
  let url = 'http://localhost:3000/lyric?id=' + id
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
    url: 'http://localhost:3000/banner'
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
    url: 'http://localhost:3000/personalized'
  })
    .then(function (res) {
      return res.data.result
    })
}

export function songSheetDetail (id) {
  return axios({
    method: 'get',
    url: 'http://localhost:3000/playlist/detail?id=' + id
  })
    .then(function (res) {
      return res
    })
}

export function login (method, num, password) {
  if (method === 'cellphone') {
    return axios({
      method: 'get',
      url: `http://localhost:3000/login/cellphone?phone=${num}&password=${password}`
    })
      .then(function (res) {
        console.log(res)
      })
  } else if (method === 'email') {
    return axios({
      method: 'get',
      url: `http://localhost:3000/login?email=${num}@163.com&password=${password}`
    })
      .then(function (res) {
        console.log(res)
      })
  }
}

export function rank (key) {
  return axios({
    method: 'get',
    url: 'http://localhost:3000/top/list?idx=' + key
  })
    .then(function (res) {
      return res.data.playlist
    })
}
