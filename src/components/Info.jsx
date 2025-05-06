import React, { useState } from 'react';
import { Button, Card, Divider, Flex, Form, Input, Select, Space } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { useDonor } from '../context/donor-context';
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8 },
};

const FormStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: '100vh',
  justifyContent: 'center',
}


export default function Info() {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const {data, fetchDepartmentsData, deptPage, parseMultipleUrls, loading, progress} = useDonor();

  console.log(deptPage);

  const handleReset = () => {
    setIsSubmitted(false);
  };

  const [form] = Form.useForm();
  
  const onReset = () => {
    form.resetFields();
  };

  const handleParse = async (urls) => {
    const results = await parseMultipleUrls(urls);
    console.log('Parsed data:', results);
  };

  return (
    <div>
    {!isSubmitted ? (
    <Flex style={FormStyle}>
      
      <Typography.Title level={3} style={{paddingBottom: 30}}>Укажите вашу группу крови и резус фактор для поиска</Typography.Title>
      <Form
            {...layout}
            form={form}
            name="control-hooks"
            // onFinish={() => fetchDepartmentsData(data.depts)}
            onFinish={() => handleParse(deptPage.links)}
            style={{minWidth: 600}}
          >
            <Form.Item name="groupOfBlood" label="Группа крови" rules={[{ required: true }]}>
              <Select
                placeholder="Выбери группу крови"
              
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
               
                allowClear
              >
                <Option value="+">Rh+</Option>
                <Option value="-">Rh-</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Поиск
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Очистить
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Flex>
        )  : (
        <Card
          title={`Результаты по запросу: "${formData.groupOfBlood}"`}
          extra={
            <Button type="link" onClick={handleReset}>
              Новый поиск
            </Button>
          }
          style={{ maxWidth: 800, margin: '0 auto' }}
        >
          {searchResults.map((item) => (
            <div key={item.id} style={{ marginBottom: 16 }}>
              <h3>{item.name}</h3>
              <p>{item.details}</p>
              <Divider />
            </div>
          ))}
        </Card>
      )}
    </div>
    
  );
};






