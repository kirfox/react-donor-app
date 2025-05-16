import { Button, Flex, Form, Select, Space, Typography } from "antd";
import { useDonor } from "../context/donor-context";
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


export default function BloodTypePicker() {
  const [form] = Form.useForm();

  

  const {
    deptPage,
    parseMultipleUrls,
    isSearching,
    setSearchResults,
    setIsSearching,
  } = useDonor();

  const onReset = () => {
    form.resetFields();
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
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Ошибка поиска:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Flex style={FormStyle}>
      <Typography.Title level={3} style={{ paddingBottom: 30 }}>
        Укажите вашу группу крови и резус фактор для поиска
      </Typography.Title>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={(value) => {
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
        <Form.Item name="rhesus" label="Резус" rules={[{ required: true }]}>
          <Select placeholder="Выбери резус фактор" allowClear>
            <Option value="+">Rh+</Option>
            <Option value="-">Rh-</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit" loading={isSearching}>
              {isSearching ? "Идет поиск..." : "Поиск"}
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Очистить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Flex>
  );
}
