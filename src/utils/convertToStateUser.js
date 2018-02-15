export default function convertToStateUser(apiUser) {
  let profile = apiUser.getProfile()
  return {
    id: apiUser.id,
    name: profile.name? profile.name: '',
    avatar: profile.avatar? profile.avatar: ''
  }
}