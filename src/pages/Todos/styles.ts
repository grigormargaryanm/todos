import styled from 'styled-components'
import { Skeleton, Button } from 'antd'

export const Wrapper = styled.div`
  padding: 24px;
`

export const AddTodoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-top: 20px;
`
export const SkeletonColumn = styled(Skeleton)`
  margin-bottom: 2px;
`

export const EllipsisButton = styled(Button)`
  justify-content: center;
  align-items: center;
  display: inline-flex;
`
