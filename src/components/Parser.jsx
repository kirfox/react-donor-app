import { useState, useEffect } from "react";
import axios from "axios";
import { Flex, Input, Layout, Menu, theme } from "antd";
import { useDonor } from "../context/donor-context";
import Search from "antd/es/input/Search";
import { StarFilled, StarOutlined, StarTwoTone } from "@ant-design/icons";

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
  const { data, fetchDepartmentData } = useDonor();
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredStar, setHoveredStar] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const filteredDept = data.depts.filter((dept) =>
    Object.values(dept).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedDepts = [...filteredDept].sort((a, b) => {
    const aIsFavorite = favorites.includes(a.id);
    const bIsFavorite = favorites.includes(b.id);
    return aIsFavorite === bIsFavorite ? 0 : aIsFavorite ? -1 : 1;
  });

  const handleStarClick = (deptId, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(deptId)
        ? prev.filter((id) => id !== deptId)
        : [deptId,...prev]
    );
  };

  const item = sortedDepts.map((dept) => ({
    icon: (
      <div
        onMouseEnter={() => setHoveredStar(dept.id)}
        onMouseLeave={() => setHoveredStar(null)}
        onClick={(e) => handleStarClick(dept.id, e)}
        style={{ cursor: "pointer" }}
      >
        {favorites.includes(dept.id) || hoveredStar === dept.id ? (
          <StarFilled
            style={{
              color: favorites.includes(dept.id) ? "#faad14" : "#ffcc00",
            }}
          />
        ) : (
          <StarOutlined />
        )}
      </div>
    ),
    label: (
      <span onClick={() => fetchDepartmentData(dept.link)}>{dept.name}</span>
    ),
    key: dept.id,
  }));

  //   console.log(data);
  return (
    <Layout.Sider style={siderStyle} width={1000} collapsible  collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div className="demo-logo-vertical" />
      <Input
        placeholder="input search text"
        size="large"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Menu theme="dark" mode="inline" inlineIndent="10" items={item} />
    </Layout.Sider>
  );
};

export default Parser;
