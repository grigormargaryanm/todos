import styled from 'styled-components'
import { Form } from 'antd'

export const StyledFormItem = styled(Form.Item)`
  width: 100%;

  svg {
    width: 16px !important;
  }

  input {
    border-radius: 10px;
  }

  .ant-input-group-addon {
    border-radius: 10px 0 0 10px;
    border: none;
  }
`
