import { pendingTask, begin, end } from 'react-redux-spinner'
import { ADD_PENDING_TASK, REMOVE_PENDING_TASK } from '../constants'

export const addPendingTask = () => {
  return {
    type: ADD_PENDING_TASK,
    meta: { [ pendingTask ]: begin }
  }
}

export const removePendingTask = () => {
  return {
    type: REMOVE_PENDING_TASK,
    meta: { [ pendingTask ]: end }
  }
}
