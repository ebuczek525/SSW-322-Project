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
       id: ''
     };
   }

   handleChange(e) {
      this.setState({[e.target.id]: e.target.value});
      console.log('changed:', e );
    }
  
 
   render () {
      const id = this.state.id;
      console.log(this.state);

      return (
         <>
            <div>
               <Layout>
                  <div className='display'>
                  <div>Please enter code to display test/survey:</div>
                     <Input value={id} id='id' placeholder="MongoDB ID" onChange={(e) => this.handleChange(e)}/>
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