import { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Menu, theme } from "antd";
import { useDonor } from "../context/donor-context";
import Search from "antd/es/input/Search";

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};


const Parser = () => {
  const { data, test } =  useDonor()
  
 
//   console.log(data);
  return (
    <Layout.Sider style={siderStyle} width={300}>
      <div className="demo-logo-vertical" />
      <Search placeholder="input search text" enterButton="Search" size="large" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        
        items={data.nameOfDept.map((dept) => ({
          label: (
            <span
              onClick={() => test(dept.link)}
            >
              {dept.name}
            </span>
          ),
          key: dept.id,
        }))}
      />
    </Layout.Sider>
  );
};

export default Parser;
