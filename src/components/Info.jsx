import React from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export default function Info() {
  const [form] = Form.useForm();
  const onGenderChange = value => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };
  const onFinish = values => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="groupOfBlood" label="Группа крови" rules={[{ required: true }]}>
        <Select
          placeholder="Выбери группу крови"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="1">I</Option>
          <Option value="2">II</Option>
          <Option value="3">III</Option>
          <Option value="4">IV</Option>
        </Select>
      </Form.Item>
      <Form.Item name="rhesus" label="Резус" rules={[{ required: true }]}>
        <Select
          placeholder="Выбери резус фактор"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="+">Rh+</Option>
          <Option value="-">Rh-</Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};






