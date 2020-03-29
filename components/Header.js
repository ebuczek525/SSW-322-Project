import Link from 'next/link';
import {
    Icon,
    Row,
    Col,
    Menu,
  } from 'antd';

  const linkStyle = {
    marginRight: '15px',
  };

  import '../styling/Header.less';
  

class Header extends React.Component {
    constructor(props) {
        super(props);
    
        // Set initial tab state
        this.state = {
          currentTab: 'form',
        };
      }
    
      // Click Handler for clicking on the different tabs
      handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          currentTab: e.key,
        });
      };

      render() {
        return (
          <>
            <div>
                <Row justify="space-around" type="flex">
                    <Col span={20} className='header'>
                    <Row justify="space-around" type="flex">
                        <Col span={12} md={12} xs={24}>
                        <span ><h1 style={{color: '#ffffff', fontSize: '5vh', marginLeft: '4vw'}}>Website Name</h1></span>
                        </Col>
                        <Col span={12} md={12} xs={0}>
                        <span className="ml-30 float-right"> </span>
                        </Col>
                    </Row>
                    </Col>
                </Row>              
            </div>
            <div>
            <div className='nav'>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
              <Menu.Item key="home">
                <Link href="/">
                  <a style={linkStyle}>Home</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="create">
                <Link href="/create">
                  <a style={linkStyle}>Create Test/Survey</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="display">
                <Link href="/display">
                  <a style={linkStyle}>Display Test/Survey</a>
                </Link>
              </Menu.Item>
              </ Menu>
                </div>
            </div>
          </>
        );
      }
}
  
export default Header;