import styled from 'styled-components'
import { Button } from 'antd'

export const ModalCancel: typeof Button = styled(Button)`
  background: #f6f6f8;
  span {
    color: #000;
    opacity: 0.65;
  }
`
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  > button:first-child {
    margin-right: 8px;
  }
`
