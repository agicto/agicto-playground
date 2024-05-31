import { Row, Col, Slider, InputNumber } from "antd";
import { useState } from "react";

export const IntegerStep: React.FC<{
  value?: number
  onChange?: (val: number | null) => void
  max?: number
  step?: number
  disabled?: boolean
}> = ({ value, onChange, max = 2, step = 0.1, disabled = false }) => {
  const [inputValue, setInputValue] = useState(1)

  // const onChange = (newValue: number) => {
  //   setInputValue(newValue)
  // }

  return (
    <Row className="rounded pr-0">
      <Col span={12}>
        <Slider disabled={disabled} min={0} max={max} onChange={onChange} value={typeof value === 'number' ? value : 0} step={step} />
      </Col>
      <Col span={4}>
        <InputNumber min={0} max={max} style={{ margin: '0 16px' }} step={step} value={value} onChange={onChange} />
      </Col>
    </Row>
  )
}