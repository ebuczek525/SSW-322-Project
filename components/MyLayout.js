
import Header from './Header';
import { Layout } from 'antd';

import '../styling/Layout.less';


const {Content, Footer } = Layout;


const layoutStyle = {
  margin: 20,
  padding: 20,
};



const MainLayout = props => (
    <Layout>
      <Header />
      <Content className='content'>
        {props.children}
      </Content>
    </Layout>
);

export default MainLayout;