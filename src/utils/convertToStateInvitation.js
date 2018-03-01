import convertToStateUser from './convertToStateUser'

export default function convertToStateInvitation(apiInvitation, user, isMy) {
  return convertToStateUser(user)
    .then(user => {
      return {
        id: apiInvitation.id,
        isMy: isMy,
        apiInvitation: apiInvitation,
        user: user
      }
    })
}