import { Layout } from "antd";
import Parser from "./Parser";

const siderStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#1677ff',
  };

export default function Slider() {
    return (
        <Layout.Sider width="25%" style={siderStyle}>
          Sider
          <Parser></Parser>
        </Layout.Sider>
    )
}