import React from 'react';
import { Flex, Layout } from 'antd';
import Header from './components/Header';
import Slider from './components/Slider';
import Content from './components/content';


const App = () => (
  <Flex >
    <Layout>
      <Header></Header>
      <Layout>
        <Slider></Slider>
        <Content></Content>
      </Layout>
    </Layout>
  </Flex>
);
export default App;