import Layout from '../components/MyLayout';
import { 
   Button,
   Input,
 } from 'antd';

import '../styling/display.less';


class Display extends React.Component {
   constructor(props) {
     super(props);
 
     this.state = {
       
     };
   }
 
   render () {
      return (
         <>
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
         </>
      );
   }
}

export default Display;