import { FC } from 'react'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import uuid from 'react-uuid'
import { Button, DatePicker, Form, Modal, notification, Checkbox } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useTodoActions } from '../../../../redux'
import { ITodos, TodoStatus } from '../../../../types/ITodos'
import { FormInput } from '../../../../components'
import { validationSchema } from './ValidationSchema'
import { Footer, ModalCancel } from './styles'

type EditTodoModalType = {
  createEditModalOpen: boolean
  setCreateEditModalOpen: (editModalOpen: boolean) => void
  setCurrentTodo: (todo: ITodos) => void
  todo: ITodos
  todos: ITodos[]
}
const CreateEditTodo: FC<EditTodoModalType> = ({
  createEditModalOpen,
  setCreateEditModalOpen,
  todo,
  todos,
  setCurrentTodo,
}) => {
  const { addTodos, updateTodos } = useTodoActions()
  const [api, contextHolder] = notification.useNotification()

  const buttonText = todo.id ? 'Edit' : 'Add'
  const handleCreate = (data: ITodos) => {
    let successDescription = 'You have successfully added a task.'
    if (todo.id) {
      const newTodoList: ITodos[] = todos.map((item: ITodos): ITodos => {
        if (item.id === data.id) {
          item = data
        }
        return item
      })
      updateTodos(newTodoList)
      successDescription = 'You have successfully updated the task'
    } else {
      addTodos({ ...data, id: uuid(), deadline: data.deadline || dayjs() })
    }
    api.success({
      message: 'Success!',
      description: successDescription,
    })
    setCreateEditModalOpen(false)
    resetForm()
    setCurrentTodo({} as ITodos)
  }

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue, resetForm } = useFormik({
    initialValues: {
      id: todo.id,
      title: todo.title || '',
      description: todo.description || '',
      status: todo.status || TodoStatus.PENDING,
      deadline: todo.deadline,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleCreate,
  })

  const handleCancel = () => {
    setCreateEditModalOpen(false)
    setCurrentTodo({} as ITodos)
  }

  const onChange = (e: CheckboxChangeEvent) => {
    setFieldValue('status', e.target.checked ? TodoStatus.COMPLETED : TodoStatus.PENDING)
  }

  const renderSelect = () => {
    if (todo && todo.status === TodoStatus.PENDING) {
      return (
        <Form.Item labelCol={{ span: 24 }} label='Status'>
          <Checkbox name='status' onChange={onChange}>
            {TodoStatus.COMPLETED}
          </Checkbox>
        </Form.Item>
      )
    }
  }

  return (
    <Modal open={createEditModalOpen} footer={false} centered onCancel={handleCancel}>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <FormInput
          size='large'
          label='Title'
          placeholder='Title'
          touched={!!touched.title}
          error={errors.title}
          {...getFieldProps('title')}
        />
        <FormInput
          size='large'
          label='Description'
          placeholder='Description'
          {...getFieldProps('description')}
        />
        <Form.Item labelCol={{ span: 24 }} label='Deadline'>
          <DatePicker
            {...getFieldProps('deadline')}
            disabledDate={(d) => d.isBefore(dayjs().add(-1, 'day'))}
            size='large'
            onChange={(date) => setFieldValue('deadline', date)}
          />
        </Form.Item>
        {renderSelect()}
        <Footer>
          <ModalCancel type='text' key='cancel' onClick={handleCancel}>
            Cancel
          </ModalCancel>
          <Button htmlType='submit' key='update' type='primary'>
            {buttonText}
          </Button>
        </Footer>
      </form>
    </Modal>
  )
}
export default CreateEditTodo
