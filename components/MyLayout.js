
import Header from './Header';
import { Layout } from 'antd';

import '../styling/Layout.less';


const {Content, Footer } = Layout;





const MainLayout = props => (
    <Layout>
      <Header />
      <Content className='content'>
        {props.children}
      </Content>
    </Layout>
);

export default MainLayout;