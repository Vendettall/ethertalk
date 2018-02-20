import convertToStateUser from './convertToStateUser'

export default function convertToStateInvitation(apiInvitation, user, isMy) {
  return {
    id: apiInvitation.id,
    isMy: isMy,
    apiInvitation: apiInvitation,
    user: convertToStateUser(user)
  }
}