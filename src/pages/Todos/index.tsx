import React, { FC, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, notification, Table, Typography } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { todoSelectors, useTodoActions } from '../../redux'
import { ITodos, TodoStatus, Filter } from '../../types/ITodos'
import { useCheckDeadline, useResponsive } from '../../hook'
import { skeletonData, useGenerateTodoListColumns } from './Columns'
import CreateEditTodo from './components/CreateEditTodo'
import TodoCard from './components/TodoCard'
import TodoSkeleton from './components/TodoCard/TodoSkeleton'
import TodosFilter from './components/TodosFilter'
import { AddTodoWrapper, Wrapper } from './styles'

const { Title, Text } = Typography
const TODO_PAGE_SIZE = 10

const Todos: FC = () => {
  const todosList = useSelector(todoSelectors.getTodos)
  const { handleDeleteTodo } = useTodoActions()
  const { isLessThanMd } = useResponsive()
  const [api, contextHolder] = notification.useNotification()
  const [todos, setTodos] = useState<ITodos[]>([])
  const [filter, setFilter] = useState<Filter>(Filter.ALL)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [createEditModalOpen, setCreateEditModalOpen] = useState<boolean>(false)
  const [currentTodo, setCurrentTodo] = useState<ITodos>({} as ITodos)
  const hasPagination = todos.length > TODO_PAGE_SIZE
  useCheckDeadline(todos)

  useEffect(() => {
    setIsLoading(true)

    if (filter === Filter.ALL) {
      setTodos(todosList.filter((todo) => todo.status !== TodoStatus.REMOVED))
    } else {
      setTodos(todosList.filter((todo) => todo.status === TodoStatus.REMOVED))
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [todosList, filter])

  const handleCurrentTodo = (currentTodo: ITodos, type?: string) => {
    setCurrentTodo(currentTodo)
    if (type) {
      setDeleteModalOpen(true)
    } else {
      setCreateEditModalOpen(true)
    }
  }

  const columns: ColumnProps<ITodos>[] = useGenerateTodoListColumns(
    isLoading,
    filter,
    handleCurrentTodo,
  )

  const handleCancelDelete = () => {
    setDeleteModalOpen(false)
  }

  const handleDelete = () => {
    handleDeleteTodo(currentTodo.id)
    setDeleteModalOpen(false)
    api.success({
      message: 'Success!',
      description: 'You have successfully deleted the task.',
    })
    setCurrentTodo({} as ITodos)
  }

  const renderTodosList = useCallback(() => {
    return isLessThanMd ? (
      isLoading ? (
        Array.from({ length: TODO_PAGE_SIZE }).map((_, index) => <TodoSkeleton key={index} />)
      ) : (
        todos.map((todo: ITodos) => (
          <TodoCard todo={todo} key={todo.id} handleCurrentTodo={handleCurrentTodo} />
        ))
      )
    ) : (
      <Table
        columns={columns}
        dataSource={isLoading ? skeletonData(TODO_PAGE_SIZE) : todos}
        pagination={hasPagination ? {} : false}
        rowKey={(record: ITodos) => record.id}
      />
    )
  }, [isLessThanMd, hasPagination, columns, isLoading, todos])

  return (
    <Wrapper>
      {contextHolder}
      <Title level={3}>Todos</Title>
      <AddTodoWrapper>
        <TodosFilter setFilter={setFilter} />
        <Button type='primary' onClick={() => setCreateEditModalOpen(true)}>
          Add Todo
        </Button>
      </AddTodoWrapper>
      {renderTodosList()}
      <Modal
        title='Delete Modal'
        open={deleteModalOpen}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
      >
        <Text>Do you want to delete task?</Text>
      </Modal>
      <CreateEditTodo
        createEditModalOpen={createEditModalOpen}
        setCreateEditModalOpen={setCreateEditModalOpen}
        todo={currentTodo}
        todos={todos}
        setCurrentTodo={setCurrentTodo}
      />
    </Wrapper>
  )
}

export default Todos
