import React from 'react'
import { Form, Label, Radio } from 'semantic-ui-react'

const RadioInput = ({input, type, placeholder, multiple, options, meta: {touched, error}}) => {
  return (
    <Form.Field error={touched && !!error}>
      <Radio
        value={input.value || false}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
      />
      {touched && error && <Label basic color='red'>{error}</Label>}
    </Form.Field>
  )
}

export default RadioInput
