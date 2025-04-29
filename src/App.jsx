import React from 'react';
import { Flex, Layout } from 'antd';
import Header from './components/Header';
import Slider from './components/Slider';
import Content from './components/Content';
import Parser from './components/Parser';
import { DonorContextProvider } from './context/donor-context';


const App = () => (
  <DonorContextProvider>

  
    <Flex >
      <Layout>
        <Header></Header>
        <Layout>
          <Parser></Parser>
          <Content></Content>
        </Layout>
      </Layout>
    </Flex>
  </DonorContextProvider>
);
export default App;