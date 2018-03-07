const toDoubleFormat = value => {
  return value < 10 ? '0' + value : value
}

const formatDate = date => {
  return `${toDoubleFormat(date.getDate())}.`+
         `${toDoubleFormat(date.getMonth() + 1)}.`+
         `${date.getFullYear().toString()} `+
         `${toDoubleFormat(date.getHours())}:`+
         `${toDoubleFormat(date.getMinutes())}`
}


export default formatDate