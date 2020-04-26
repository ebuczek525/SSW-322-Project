import Layout from "../components/MyLayout";
import MultipleChoice from "../components/MultpleChoice";
import TrueOrFalse from "../components/TrueOrFalse";
import ShortAnswer from "../components/ShortAnswer";
import Essay from "../components/Essay";
import RankedChoice from "../components/RankedChoice";

import { 
   Button,
   Input,
   message
 } from 'antd';

import '../styling/display.less';
import axios from 'axios';


class Display extends React.Component {
   constructor(props) {
     super(props);
 
     this.state = {
       id: '',
       code: '',
       testFound: false,
       modify: false,
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
            this.setState(() => ( {code: response.data }), () => {
               console.log(this.state)
            })
         })
         .catch((error) => {
            console.log(error);
         });
   };

   modifyTest() {
      axios.post('http://localhost:8080/modify', this.state)
         .then((response) => {
            console.log(response);
            this.setState(() => ( {code: response.data }), () => {
               console.log(this.state)
            })
            message.success('Test Modified Successfully');
            console.log(response);
         })
         .catch((error) => {
            console.log(error);
            message.error('Test Modify Failed.');
         });
   };
   
   setModify() {
      this.setState({modify: (this.state.modify ? false : true)});
   }
   
   renderQuestion(questions) {
      console.log(questions);
      if (questions != undefined && questions.length != 0) {
         return questions.map(question => {
            if (question.type === 'mc') {
               return <MultipleChoice callback={( this.state.modify ? this.getQuestionState : () => {return this.setQuestionState(question)})} key = {question.index} index={question.index} editable={this.state.modify}/>
            } else if (question.type === 'tf') {
               return <TrueOrFalse callback={( this.state.modify ? this.getQuestionState : () => {return this.setQuestionState(question)})} key= {question.index} index={question.index} editable={this.state.modify}/>
             } else if (question.type === 'sa') {
               return <ShortAnswer callback={( this.state.modify ? this.getQuestionState : () => {return this.setQuestionState(question)})} editable={this.state.modify}/>
             }  else if (question.type === 'es') {
               return <Essay callback={( this.state.modify ? this.getQuestionState : () => {return this.setQuestionState(question)})} key= {question.index} index={question.index} editable={this.state.modify}/>
             }  else if (question.type === 'rc') {
               return <RankedChoice callback={( this.state.modify ? this.getQuestionState : () => {return this.setQuestionState(question)})} key= {question.index} index={question.index} editable={this.state.modify}/>
             } else {
                return null;
             }
         })
      } else {
         return null;
      }
   }

   setQuestionState = (state) => {  
      return state;

   }

   getQuestionState = (state) => {
      this.setState((oldState) => {
         oldState.code.questions[oldState.code.questions.findIndex(x => x.index === state.index)] = state
         console.log(this.state.code.questions)
         return {code: oldState.code}
       }, () => {console.log(this.state.code.questions)})
   }

 
   render () {
      const id = this.state.id;
      const testFound = this.state.testFound;
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

                  {this.state.code.questions != undefined  &&
                  <div>
                     <hr style={{ width: "97%",  marginTop: "2vh"}} />
                     <div>
                        <div style={{display: "inline-block", float: "left", marginLeft: '2vw', marginTop: '.4vh', fontWeight: 'bold'}}>
                           {this.state.code.testName}
                        </div>
                        <div style={{display: "inline-block", float: "left", marginLeft: '2vw'}}>
                           {this.state.modify ?  <Button type="primary" style={{width: '135px' }} onClick={() => this.modifyTest()}>Save</Button> : <Button type="primary" style={{width: '135px' }} onClick={() => this.setModify()}>Modify</Button>}
                        </div>
                     </div>
                     <hr style={{ width: "97%", marginTop: "4.25vh"}} />
                  </div>
                  }

                  <div className='displayContents' style={{marginTop: '.5vh'}}>
                     {this.renderQuestion(this.state.code.questions) }  
                  </div>
               </Layout>
            </div>
         </>
      );
   }
}

export default Display;