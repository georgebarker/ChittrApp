const BASE_API_URL = 'http://10.0.2.2:3333/api/v0.0.5/'
export function getChitPhotoUrl (chitId) {
  return BASE_API_URL + 'chits/' + chitId + '/photo'
}

export function getUserPhotoUrl (userId) {
  return BASE_API_URL + 'user/' + userId + '/photo'
}

export function postUserPhotoUrl () {
  return BASE_API_URL + 'user/photo'
}

export function getChitsUrl (startIndex) {
  return BASE_API_URL + 'chits?start=' + startIndex + '&count=10'
}

export function logoutUrl () {
  return BASE_API_URL + 'logout'
}

export function patchUserDetailsUrl (userId) {
  return BASE_API_URL + 'user/' + userId
}

export function loginUrl () {
  return BASE_API_URL + 'login'
}

export function postPhotoAttachmentUrl (chitId) {
  return BASE_API_URL + 'chits/' + chitId + '/photo'
}

export function postChitsUrl () {
  return BASE_API_URL + 'chits/'
}

export function postUserSignUpUrl () {
  return BASE_API_URL + 'user'
}

export function getUsersUrl (query) {
  return BASE_API_URL + 'search_user?q=' + query
}

export function followUserUrl (userId) {
  return BASE_API_URL + 'user/' + userId + '/follow'
}

export function getFollowingUrl (userId) {
  return BASE_API_URL + 'user/' + userId + '/following'
}

export function getFollowersUrl (userId) {
  return BASE_API_URL + 'user/' + userId + '/followers'
}

export function getUserProfileUrl (userId) {
  return BASE_API_URL + 'user/' + userId
}
