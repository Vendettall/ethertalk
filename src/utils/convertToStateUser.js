export default function convertToStateUser(apiUser) {
  return apiUser.getProfile()
    .then(profile => {
      return {
        id: apiUser.id,
        name: profile[0]? profile[0]: 'Anonymus',
        avatar: profile[1]? profile[1]: 'Anonymus',
        apiUser: apiUser
      }
    })
}