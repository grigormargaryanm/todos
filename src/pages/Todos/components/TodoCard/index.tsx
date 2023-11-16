import { FC } from 'react'
import { SwiperSlide } from 'swiper/react'
import dayjs from 'dayjs'
import { Button, Typography } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ITodos, TodoStatus } from '../../../../types/ITodos'
import { StatusTag } from '../../../../components'
import { SwiperWrapper, EditButton, ActionsWrapper, TodoWrapper, Footer, TextStyle } from './styles'

const { Text } = Typography

type Props = {
  todo: ITodos
  handleCurrentTodo: (todo: ITodos, type?: string) => void
}

const TodoCard: FC<Props> = ({ todo, handleCurrentTodo }) => {
  const isRemovedTodo: boolean = todo.status === TodoStatus.REMOVED

  return (
    <SwiperWrapper spaceBetween={0} slidesPerView='auto'>
      <SwiperSlide>
        <TodoWrapper>
          <TextStyle strong>{todo.title}</TextStyle>
          <TextStyle>{todo.description}</TextStyle>
          <Footer>
            <StatusTag status={todo.status} />
            <Text>{dayjs(todo.deadline).format('DD/MM/YYYY')}</Text>
          </Footer>
        </TodoWrapper>
      </SwiperSlide>
      {!isRemovedTodo && (
        <SwiperSlide>
          <ActionsWrapper>
            <EditButton onClick={() => handleCurrentTodo(todo)}>
              <EditOutlined />
              Edit
            </EditButton>
            <Button type='primary' danger onClick={() => handleCurrentTodo(todo, 'delete')}>
              <DeleteOutlined />
              Delete
            </Button>
          </ActionsWrapper>
        </SwiperSlide>
      )}
    </SwiperWrapper>
  )
}

export default TodoCard
