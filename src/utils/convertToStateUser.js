export default function convertToStateUser(apiUser) {
  let profile = apiUser.getProfile()
  return {
    id: apiUser.id,
    name: profile.name? profile.name: 'Anonymus',
    avatar: profile.avatar? profile.avatar: 'Anonymus',
    apiUser: apiUser
  }
}