import { Button, Flex, Layout } from "antd";
import '../index.css'
import { useDonor } from "../context/donor-context";
const contentStyle = {
    color: '#fff',
    padding: '1rem',
  };

  const boxStyle = {
    width: '100%',
    // height: 120,
    // borderRadius: 6,
    // border: '1px solid #40a9ff',
    color: '#000',
    marginTop: 30
  };

  const groupOfBloodStyle = {
    fontSize: '30px',
  };

  const resusStyle = {
    fontSize: '20px',
    marginTop: '10px',
    // backgroundColor: '#ffffff',
  };

  const baseStyle = {
    width: '25%',
    height: 54,
  };

const groupsOfBlood = [
    '0 (I)',
    'A (II)',
    'B (III)',
    'AB (IV)'
]

export default function Content() {
    const { dept } =  useDonor()
    console.log(dept);
    
    return (
        <Layout.Content style={contentStyle}>
              
            <h2 style={{color: "#000"}} >{dept === null ? '' : dept.deptTitle}</h2>
            <Flex style={boxStyle} justify={'space-around'}>
                <Flex vertical>
                    <Flex vertical align="center">
                        <span style={groupOfBloodStyle} >0 (I)</span>
                        <Flex horizontal style={resusStyle}>
                            <Flex className={dept === null ? '' : dept.donorTraficlighter[0]}>Rh+</Flex>
                            <Flex className={dept === null ? '' : dept.donorTraficlighter[1]} style={{marginLeft: 10}}>Rh-</Flex>
                        </Flex>
                    </Flex> 
                    <Flex vertical align="center" style={{marginTop: 10}}>
                        <span style={groupOfBloodStyle} >B (III)</span>
                        <Flex horizontal style={resusStyle}>
                            <Flex className={dept === null ? '' : dept.donorTraficlighter[4]}>Rh+</Flex>
                            <Flex className={dept === null ? '' : dept.donorTraficlighter[5]}style={{marginLeft: 10}}>Rh-</Flex>
                        </Flex>
                    </Flex> 
                </Flex>
                
                <Flex vertical>
                    <Flex vertical align="center">
                        <span style={groupOfBloodStyle} >A (II)</span>
                        <Flex horizontal style={resusStyle}>
                            <Flex className={dept === null ? '' : dept.donorTraficlighter[2]}>Rh+</Flex>
                            <Flex className={dept === null ? '' : dept.donorTraficlighter[3]}style={{marginLeft: 10}}>Rh-</Flex>
                        </Flex>
                    </Flex>
                    
                    <Flex vertical align="center" style={{marginTop: 10}}>
                        <span style={groupOfBloodStyle} >AB (IV)</span>
                        <Flex horizontal style={resusStyle}>
                            <Flex className={dept === null ? '' : dept.donorTraficlighter[6]}>Rh+</Flex>
                            <Flex className={dept === null ? '' : dept.donorTraficlighter[7]}style={{marginLeft: 10}}>Rh-</Flex>
                        </Flex>   
                    </Flex> 
                </Flex>
                
            </Flex>
        



            {/* <Flex vertical={'vertical'}>
                {groupsOfBlood.map((_, i) => (
                    
                    <Flex key={i} vertical align="center">
                        {console.log(i)}
                        <span style={groupOfBloodStyle} >{groupsOfBlood[i]}</span>
                        <Flex horizontal style={resusStyle}>
                            <Flex className={dept === null ? '' : dept.donorTraficlighter[i]}>Rh+</Flex>
                            <Flex className={dept === null ? '' : dept.donorTraficlighter[i+1]} style={{marginLeft: 10}}>Rh-</Flex>
                        </Flex>
                        
                    </Flex> 
                ))}
            </Flex> */}
        </Layout.Content>
    )
}