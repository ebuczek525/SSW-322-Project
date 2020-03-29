import Layout from '../components/MyLayout';
import { 
   Select,
   Button,
   Input,
 } from 'antd';

import '../styling/display.less';


export default function Display() {
return (
<div>
   <Layout>
      <div className='display'>
      <div>Please enter code to display test/survey:</div>
         <Input id='idInput' placeholder="MongoDB ID" />
         <Button type="primary" style={{marginLeft: '.5vw', marginTop: '.5vh',  width: '135px'}}>Submit</Button>
      </div>
      <div className='displayContents'>
      </div>
   </Layout>
</div>
);
}
