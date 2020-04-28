import {
  Layout,

} from 'antd';
import Header from '../components/Header';
import "../styling/index.less";


export default () => (
  <Layout>
    <Header />
    <img src='../static/homepic.jpg'/>
    <div id="welcome"><h1>Welcome</h1></div>
    <div id="to"><h1>to</h1></div>
    <div id="website"><h1>Test Library</h1></div>

  </Layout>
)