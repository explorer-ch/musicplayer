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
        return res.data.songs[0]
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
