export default function convertToStateUser(user) {
  let profile = user.getProfile()
  return {
    id: user.id,
    name: profile.name? profile.name: '',
    avatar: profile.avatar? profile.avatar: ''
  }
}