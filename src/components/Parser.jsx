// src/components/DataParser.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Menu, theme } from "antd";
import { useDonor } from "../context/donor-context";

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
  const { data, test, dept } =  useDonor()
  
 

  function name(link) {
    test(link)
  }
  console.log(data);
  return (
    <Layout.Sider style={siderStyle} width={300}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        
        items={data.nameOfDept.map((dept) => ({
          label: (
            <span
              onClick={() => name(dept.link)}
              style={{
                // display: "inline-block",
                //  whiteSpace: "normal",
                //  wordBreak: "break-word",
                //  overflow:'hidden'
              }}
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
