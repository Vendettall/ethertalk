export default function formatDate(date) {
  return `${toDoubleFormat(date.getDate())}.`+
         `${toDoubleFormat(date.getMonth() + 1)}.`+
         `${date.getFullYear().toString()} `+
         `${toDoubleFormat(date.getHours())}:`+
         `${toDoubleFormat(date.getMinutes())}`
}

function toDoubleFormat(value) {
  return value < 10 ? '0' + value : value
}