import convertToStateUser from './convertToStateUser'


const convertToStateInvitation = (api, apiInvitation, user, isMy) => {
  return convertToStateUser(api, user)
    .then(user => {
      return {
        id: apiInvitation.id,
        isMy: isMy,
        apiInvitation: apiInvitation,
        user: user
      }
    })
}


export default convertToStateInvitation 