import { Flex, Layout, List, Menu, Typography } from "antd";
import { useState } from "react";
import Title from "antd/es/typography/Title";

const FormStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "100vh",
  justifyContent: "center",
};

const layoutStyle = {
  flexDirection: "row",
};

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  padding: "10px 50px",
  justifyContent: "space-around",
};

const siderItem = {
  minHeight: "100vh",
  maxWidth: 400,
};

const hintStyle = {
  display: "flex",
  marginRight: "5px",
  width: "30px",
  height: "20px",
  border: "1px solid #d9d9d9",
};



export default function Dept({ searchResults }) {
  const [dept, setDept] = useState(searchResults[0].data);
  const [isHover, setIsHover] = useState(false);

  const linkStyle = {
    color: isHover ? 'grey' : 'black'
    
   };

   const handleMouseEnter = () => {
      setIsHover(true);
   };

   const handleMouseLeave = () => {
      setIsHover(false);
   };

   

  const item = searchResults.map((dept) => ({
    label: <span 
            onClick={() => setDept(dept.data)}
            
            >{dept.data.title}</span>,
    key: dept.id,
  }));

  const text = [
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
  ];

  return (
    <Flex style={FormStyle}>
      <Layout style={layoutStyle}>
        <Menu
          style={siderItem}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={item}
          label="asdasasd"
        />

        <Layout.Content style={contentStyle}>
          <a href={dept.url} target="blank"
           
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
            <Title  style={linkStyle} level={3}>{dept.title}</Title>
          </a>

          <Flex justify="space-around" wrap>
            {dept.donorTraficlighter.map((item) => (
              <Flex vertical >
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: 24,
                    marginBottom: 10,
                  }}
                >
                  {item.group}
                </h3>
                <Flex style={{ fontSize: 20, color: "white" }}>
                  <span className={item.rhesus[0]} style={{ marginRight: 10 }}>
                    Rh+
                  </span>
                  <span className={item.rhesus[1]}>Rh-</span>
                </Flex>
              </Flex>
            ))}
          </Flex>

          <List
            bordered
            dataSource={text}
            renderItem={(item) => (
              <List.Item style={{ display: "flex", alignItems: "flex-start" }}>
                <Typography.Text>
                  <Flex className={item[0]} style={hintStyle}></Flex>
                </Typography.Text>{" "}
                {item[1]}
              </List.Item>
            )}
          />

          <List
            split={false}
            dataSource={[
              "Адрес: " + dept.address,
              "Телефон: " + dept.phone,
              "Рабочее время: " + dept.workHours,
            ]}
            renderItem={(item) => (
              <List.Item style={{ display: "flex", alignItems: "flex-start" }}>
                {item}
              </List.Item>
            )}
          />
        </Layout.Content>
      </Layout>
    </Flex>
  );
}
