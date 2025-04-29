import { Button, Flex, Layout } from "antd";
import '../index.css'
import { useDonor } from "../context/donor-context";
const contentStyle = {
    color: '#fff',
    padding: '1rem',
  };

  const boxStyle = {
    width: '100%',
    height: 120,
    borderRadius: 6,
    border: '1px solid #40a9ff',
    color: '#000'
  };

  const groupOfBloodStyle = {
    fontSize: '30px',
  };

  const resusStyle = {
    fontSize: '20px',
    marginTop: '10px',
    // backgroundColor: '#ffffff',
  };

const s = 'spk-lights__group-item--max'
export default function Content() {

      const { dept } =  useDonor()
      
    return (
        <Layout.Content style={contentStyle}>
            
                 
                

            <Flex style={boxStyle} justify={'space-around'} >
                <Flex vertical align="center">
                    <span style={groupOfBloodStyle} >0 (I)</span>
                    <Flex horizontal style={resusStyle}>
                        <Flex className={s}>Rh+</Flex>
                        <Flex style={{marginLeft: 10}}>Rh-</Flex>
                    </Flex>
                    
                </Flex> 
                <Flex vertical align="center">
                    <span style={groupOfBloodStyle} >A (II)</span>
                    <Flex horizontal style={resusStyle}>
                        <Flex >Rh+</Flex>
                        <Flex style={{marginLeft: 10}}>Rh-</Flex>
                    </Flex>
                </Flex>
                <Flex vertical align="center">
                    <span style={groupOfBloodStyle} >B (III)</span>
                    <Flex horizontal style={resusStyle}>
                        <Flex >Rh+</Flex>
                        <Flex style={{marginLeft: 10}}>Rh-</Flex>
                    </Flex>
                </Flex> 
                <Flex vertical align="center">
                    <span style={groupOfBloodStyle} >AB (IV)</span>
                    <Flex horizontal style={resusStyle}>
                        <Flex >Rh+</Flex>
                        <Flex style={{marginLeft: 10}}>Rh-</Flex>
                    </Flex>   
                </Flex> 
            </Flex>
        



            {/* <Flex vertical={'vertical'}>
            {Array.from({ length: 4 }).map((_, i) => (
            <div
                key={i}
                style={Object.assign(Object.assign({}, baseStyle), {
                backgroundColor: i % 2 ? '#1677ff' : '#1677ffbf',
                })}
            />
            ))}
            </Flex> */}
        </Layout.Content>
    )
}