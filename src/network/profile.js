import {
  requestUser
} from "@/network/request"

export function userLogin(userInfo) {
  return requestUser({
    url: '/user',
    data: {
      userInfo
    }

  })
}