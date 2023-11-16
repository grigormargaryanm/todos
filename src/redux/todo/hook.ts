import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { ITodos } from '../../types/ITodos'
import { deleteTodo, setTodo, editTodo } from './reducer'

type Payload = {
  type: string
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  payload?: any
}

type Dispatch = (payload: Payload) => void

export default function () {
  const dispatch: Dispatch = useDispatch()

  /**
   * Todos methods
   */

  const addTodos = useCallback((payload: ITodos) => dispatch(setTodo(payload)), [dispatch])

  const updateTodos = useCallback((payload: ITodos[]) => dispatch(editTodo(payload)), [dispatch])

  const handleDeleteTodo = useCallback(
    (payload: string) => dispatch(deleteTodo(payload)),
    [dispatch],
  )
  return {
    handleDeleteTodo,
    addTodos,
    updateTodos,
  }
}
