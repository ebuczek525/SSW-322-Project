import Layout from '../components/MyLayout';
import { 
   Button,
   Input,
 } from 'antd';

import '../styling/display.less';
import axios from 'axios';


class Display extends React.Component {
   constructor(props) {
     super(props);
 
     this.state = {
       id: '',
       code: ''
     };
   }

   handleChange(e) {
      this.setState({id: e.target.value});
      console.log('changed:', e.target.value );
    }
  
   getTest() {

      axios.post('http://localhost:8080/display', this.state)
         .then((response) => {
            console.log(response);
            this.setState(() => ( {code: response }), () => {
               console.log(this.state)
            })
         })
         .catch((error) => {
            console.log(error);
         });
 };

 
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
                     <Button type="primary" style={{marginLeft: '.5vw', marginTop: '.5vh',  width: '135px' }} onClick={() => this.getTest()}>Submit</Button>
                  </div>
                  <div className='displayContents'>
                     <pre>   {JSON.stringify(this.state.code)} </pre>
                  </div>
               </Layout>
            </div>
         </>
      );
   }
}

export default Display;