import { useEffect } from 'react'
import dayjs from 'dayjs'
import { ITodos, TodoStatus } from '../types/ITodos'
import { useTodoActions } from '../redux'

const useCheckDeadline = (todos: ITodos[]) => {
  const { updateTodos } = useTodoActions()
  useEffect(() => {
    let hasOverdueTodo = false
    const today = dayjs()
    const interval = setInterval(() => {
      const newData = todos.map((item) => {
        const curItem = { ...item }
        if (item.status === TodoStatus.PENDING) {
          const currentDate = dayjs(curItem.deadline)
          if (currentDate.diff(today, 'day') < 0) {
            hasOverdueTodo = true
            curItem.status = TodoStatus.OVERDUE
          }
        }
        return curItem
      })
      if (hasOverdueTodo) {
        updateTodos(newData)
        hasOverdueTodo = false
      }
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [todos, updateTodos])
}

export default useCheckDeadline
