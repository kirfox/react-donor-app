import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  Layout,
  List,
  Menu,
  Select,
  Space,
} from "antd";
import Typography from "antd/es/typography/Typography";
import { useDonor } from "../context/donor-context";
import Title from "antd/es/typography/Title";
import "../index.css";
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8 },
};

const FormStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "100vh",
  justifyContent: "center",
};

const layoutStyle = {
  // minHeight: "100vh",
  flexDirection: "row",
};

const siderStyle = {
  color: "#fff",
  backgroundColor: "#1677ff",
};

const siderItem = {
  // padding: 10,
  // fontSize: 12,

  minHeight: "100vh",
  maxWidth: 400,
};

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  padding: '10px 50px',
  justifyContent: "space-around",
};

const hintStyle = {
  display: "flex",
  marginRight: "5px",
  width: "30px",
  height: "20px",
  border: "1px solid #d9d9d9",
};

export default function Info() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [dept, setDept] = useState({});
  const {
    data,
    fetchDepartmentsData,
    deptPage,
    parseMultipleUrls,
    loading,
    progress,
  } = useDonor();

  const [isSearching, setIsSearching] = useState(false);

  //console.log(deptPage);

  const handleReset = () => {
    setIsSubmitted(false);
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const handleParse = async (urls, formValues) => {
    const results = await parseMultipleUrls(urls);
    console.log(results);
    // console.log('Parsed data:', results);
    // searchDept(results, formValues)
  };

  // const handleParse = async () => {
  //   await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация загрузки
  //   setSearchResults([{test: "data"}]); // Тестовые данные
  //   return true;
  // };

  const searchDept = (depts, formValues) => {
    const filteredArr = depts.filter((item) => {
      // Проверяем, что данные успешно получены
      if (!item.success || !item.data || !item.data.donorTraficlighter)
        return false;

      // Ищем группу крови "A (II)"
      const bloodGroup = item.data.donorTraficlighter.find((group) =>
        group.group.includes(formValues.groupOfBlood)
      );

      // Проверяем условия
      if (!bloodGroup) return false;
      if (!bloodGroup.rhesus) return false;
      if (
        formValues.rhesus === "+" &&
        (bloodGroup.rhesus[0] === "spk-lights__group-item--max" ||
          bloodGroup.rhesus[0] === "spk-lights__group-item--gray")
      )
        return false;
      if (
        formValues.rhesus === "-" &&
        (bloodGroup.rhesus[1] === "spk-lights__group-item--max" ||
          bloodGroup.rhesus[0] === "spk-lights__group-item--gray")
      )
        return false;

      return true;
    });
    console.log(filteredArr);

    setSearchResults(filteredArr);

    console.log(searchResults);
  };

  const handleSubmit = async (formValues) => {
    setIsSearching(true);
    try {
      const results = await parseMultipleUrls(deptPage.links);
      const filteredResults = results.filter((item) => {
        // Проверяем, что данные успешно получены

        if (!item.success || !item.data || !item.data.donorTraficlighter)
          return false;

        // Ищем группу крови "A (II)"
        const bloodGroup = item.data.donorTraficlighter.find((group) =>
          group.group.includes(formValues.groupOfBlood)
        );

        // Проверяем условия
        if (!bloodGroup) return false;
        if (!bloodGroup.rhesus) return false;
        if (
          formValues.rhesus === "+" &&
          (bloodGroup.rhesus[0] === "spk-lights__group-item--max" ||
            bloodGroup.rhesus[0] === "spk-lights__group-item--gray")
        )
          return false;
        if (
          formValues.rhesus === "-" &&
          (bloodGroup.rhesus[1] === "spk-lights__group-item--max" ||
            bloodGroup.rhesus[0] === "spk-lights__group-item--gray")
        )
          return false;

        return true;
      });
      console.log(filteredResults);

      setSearchResults(filteredResults);
      setDept(filteredResults[0].data);
    } catch (error) {
      console.error("Ошибка поиска:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const showInfoDept = (dept) => {
    console.log(dept);
  };

  const item = searchResults.map((dept) => ({
    label: <span onClick={() => setDept(dept.data)}>{dept.data.title}</span>,
    key: dept.id,
  }));

  return (
    <div>
      {
        //(!isSubmitted) ?
        searchResults.length === 0 || isSearching ? (
          <Flex style={FormStyle}>
            <Typography.Title level={3} style={{ paddingBottom: 30 }}>
              Укажите вашу группу крови и резус фактор для поиска
            </Typography.Title>
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              // onFinish={() => fetchDepartmentsData(data.depts)}

              onFinish={(value) => {
                setIsSubmitted(true);

                //setFormData(value)
                //handleParse(deptPage.links, value)
                handleSubmit(value);
              }}
              style={{ minWidth: 600 }}
            >
              <Form.Item
                name="groupOfBlood"
                label="Группа крови"
                rules={[{ required: true }]}
              >
                <Select placeholder="Выбери группу крови" allowClear>
                  <Option value="I">I</Option>
                  <Option value="II">II</Option>
                  <Option value="III">III</Option>
                  <Option value="IV">IV</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="rhesus"
                label="Резус"
                rules={[{ required: true }]}
              >
                <Select placeholder="Выбери резус фактор" allowClear>
                  <Option value="+">Rh+</Option>
                  <Option value="-">Rh-</Option>
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSearching}
                  >
                    {isSearching ? "Идет поиск..." : "Поиск"}
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    Очистить
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Flex>
        ) : (
          <Flex style={FormStyle}>
            <Layout style={layoutStyle}>
            
              <Menu 
              
                style={siderItem}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={item}
                label='asdasasd'
              /> 
              {/* </Layout.Sider> */}
              <Layout.Content style={contentStyle}>
                <a href={dept.url} target="blank">
                  <Title level={3}>{dept.title}</Title>
                </a>

                <Flex justify="space-around">
                  {dept.donorTraficlighter.map((item) => (
                    <Flex vertical>
                      <h3 style={{ textAlign: "center" }}>{item.group}</h3>
                      <Flex>
                        <span className={item.rhesus[0]}>RH+</span>
                        <span className={item.rhesus[1]}>RH-</span>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>

                <List
                  bordered
                  dataSource={[
                    [
                      "spk-lights__group-item--max",
                      "- означает, что в учреждении имеется достаточный запас крови данной группы и резус-принадлежности и с визитом в Службу крови можно повременить.",
                    ],
                    [
                      "spk-lights__group-item--middle",
                      "- означает, что в учреждении присутствует потребность в крови данной группы и резус-принадлежности, рекомендуем запланировать визит для плановой донации.",
                    ],
                    [
                      "spk-lights__group-item--min",
                      "- означает, что в учреждении сложилась повышенная потребность в крови данной группы и резус-принадлежности, рекомендуем запланировать визит для плановой донации.",
                    ],
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      style={{ display: "flex", alignItems: "flex-start" }}
                    >
            
                      <Typography.Text>
                        <Flex className={item[0]} style={hintStyle}></Flex>
                      </Typography.Text>{" "}
                      {item[1]}
                    </List.Item>
                  )}
                />

                <List split={false}
                  dataSource={[
                    'Адрес: ' + dept.address,
                    'Телефон: ' + dept.phone,
                    'Рабочее время: ' + dept.workHours
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      style={{ display: "flex", alignItems: "flex-start" }}
                    >
            
                      {item}
                      
                    </List.Item>
                  )}
                />
              </Layout.Content>
            </Layout>
          </Flex>
        )
      }
    </div>
  );
}

// <Card
//           title={`Результаты по запросу: "${formData.groupOfBlood}"`}
//           extra={
//             <Button type="link" onClick={handleReset}>
//               Новый поиск
//             </Button>
//           }
//           style={{ maxWidth: 800, margin: '0 auto' }}
//         >
//           {searchResults.map((item) => (
//             <div key={item.id} style={{ marginBottom: 16 }}>
//               <h3>{item.name}</h3>
//               <p>{item.details}</p>
//               <Divider />
//             </div>
//           ))}
//         </Card>
