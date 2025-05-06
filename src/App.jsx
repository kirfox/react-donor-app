import React from 'react';
import { Flex, Layout } from 'antd';
import Header from './components/Header';
import Slider from './components/Slider';
import Content from './components/Content';
import Parser from './components/Parser';

import { DonorContextProvider } from './context/donor-context';
import Info from './components/Info';


const App = () => (
  // <DonorContextProvider>

  
  //   <Flex >
  //     <Layout>
  //       <Header></Header>
  //       <Layout>
  //         <Parser></Parser>
  //         <Content></Content>
  //       </Layout>
  //     </Layout>
  //   </Flex>
  // </DonorContextProvider>
  <DonorContextProvider>
    <Info></Info>
   
    </DonorContextProvider>
  
);
export default App;