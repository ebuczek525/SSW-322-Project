import Layout from "../components/MyLayout";
import MultipleChoice from "../components/MultpleChoice";
import TrueOrFalse from "../components/TrueOrFalse";
import ShortAnswer from "../components/ShortAnswer";
import Essay from "../components/Essay";
import RankedChoice from "../components/RankedChoice";

import { 
   Button,
   Input,
   message,
   Switch,
   Select
 } from 'antd';

import {Router} from 'next/router'


import '../styling/display.less';
import axios from 'axios';

const handleRouteChange = (url) => {
   if(!confirm("Are you sure you want to change pages?")){
      window._cancel = true 
   }

}

class Display extends React.Component {
   constructor(props) {
     super(props);
 
     this.state = {
       id: '',
       code: '',
       modify: false,
       currQuestionType: 'mc',
     };
   }

   handleSwitchChange = (checked) => {
      this.setState({testOrSurvey: checked});
      if (!this.code.testOrSurvey){
  
      }
      console.log('changed:', checked );
    }

    handleTestNameChange(e) {
      e.persist()
      this.setState((state) => {
         console.log(state.code)
         state.code.testName = e.target.value
         return {
            code: state.code
         }
      });
      console.log('changed:', e.target.value );
    }

    handleDescChange(e) {
      e.persist()
      this.setState((state) => {
         console.log(state.code)
         state.code.desc = e.target.value
         return {
            code: state.code
         }
      });
      console.log('changed:', e.target.value );
    }

    handleLookUpChange(e) {
      this.setState({id: e.target.value});
      console.log('changed:', e.target.value );
    }

    handleQuestionChange(value) {
      this.setState({currQuestionType: value});
      console.log('changed:', value );
    }
  
  
   displayCreate() {
      return (
         <div className="create">
         <div id="createInput">
           <div style={{marginBottom: '0.5vh'}}>Test or Survey:</div>
           <Switch
             checkedChildren="Test"
             unCheckedChildren="Survey"
             defaultChecked
             style={{ width: "5vw", marginLeft: '.75vw'}}
             onChange={this.handleSwitchChange}
           />
         </div>
         <div id="createInput">
           <div>Test Name:</div>
           <Input value={this.state.code.testName} id='testName' placeholder="Test Name" onChange={(e) => this.handleTestNameChange(e)}/>
         </div>
         <div id="description">
           <div >Add a Description:</div>
           <Input value={this.state.code.desc} id='desc' onChange={(e) => this.handleDescChange(e)}/>
         </div>
         <div style={{marginLeft: '2vw', marginTop: "1vh"}}>
           <div style={{display:'inline-block'}}>
               <div>Add a Question:</div>
             <div>
               <Select defaultValue="Multiple Choice" value={this.state.currQuestionType} onChange={(e) => this.handleQuestionChange(e)}>
                 <Option value="mc">Multiple Choice</Option>
                 <Option value="tf">True/False</Option>
                 <Option value="sa">Short Answer</Option>
                 <Option value="es">Essay</Option>
                 <Option value="mt">Matching</Option>
                 <Option value="rc">Ranked Choice</Option>
               </Select>
               <Button shape="circle" icon="plus" style={{ marginLeft: ".5vw" }} onClick={this.addQuestion}/>
             </div>
           </div>
         </div>
         </div>
      )
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
               return <MultipleChoice callback={( this.state.modify ? this.getQuestionState : () => {return this.setQuestionState(question)})} removeItself={this.removeQuestion} key = {question.index} index={question.index} editable={this.state.modify}/>
            } else if (question.type === 'tf') {
               return <TrueOrFalse callback={( this.state.modify ? this.getQuestionState : () => {return this.setQuestionState(question)})} removeItself={this.removeQuestion} key= {question.index} index={question.index} editable={this.state.modify}/>
             } else if (question.type === 'sa') {
               return <ShortAnswer callback={( this.state.modify ? this.getQuestionState : () => {return this.setQuestionState(question)})} removeItself={this.removeQuestion} key= {question.index} index={question.index} editable={this.state.modify}/>
             }  else if (question.type === 'es') {
               return <Essay callback={( this.state.modify ? this.getQuestionState : () => {return this.setQuestionState(question)})} removeItself={this.removeQuestion} key= {question.index} index={question.index} editable={this.state.modify}/>
             }  else if (question.type === 'rc') {
               return <RankedChoice callback={( this.state.modify ? this.getQuestionState : () => {return this.setQuestionState(question)})} removeItself={this.removeQuestion} key= {question.index} index={question.index} editable={this.state.modify}/>
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

   renderQuestions = () => {
      return this.state.code.questions.map((question) => {
        if (question.type === 'mc') {
          return <MultipleChoice callback={this.getQuestionState} key = {question.index} index={question.index} removeItself={this.removeQuestion} editable={true}/>
        } else if (question.type === 'tf') {
          return <TrueOrFalse callback={this.getQuestionState} key= {question.index} index={question.index} removeItself={this.removeQuestion} editable={true}/>
        } else if (question.type === 'sa') {
          return <ShortAnswer callback={this.getQuestionState} key= {question.index} index={question.index} removeItself={this.removeQuestion} editable={true}/>
        }  else if (question.type === 'es') {
          return <Essay callback={this.getQuestionState} key= {question.index} index={question.index} removeItself={this.removeQuestion} editable={true}/>
        }  else if (question.type === 'rc') {
          return <RankedChoice callback={this.getQuestionState} key= {question.index} index={question.index} removeItself={this.removeQuestion} editable={true}/>
        } else {
          return null;
        }
    });
    }
  
    addQuestion = () => {
      this.setState((state) => {
        state.code.questions.push( {
          type: this.state.currQuestionType,
          index: ('00000000000'+(Math.random().toString())).slice(-11)
        })
        return {questions: state.code.questions}
      }, () => console.log(this.state.questions))
    }
  
    removeQuestion = (index) => {
      console.log(index)
        this.setState((state) => { 
            state.code.questions = state.code.questions.filter((e) => e.index !== index)
            return {
               code: state.code
            }
        }, () => console.log(this.state.code.questions))
    }

 
   render () {
      const testID = this.state.id;
      console.log(this.state);

      return (
         <>
            <div>
               <Layout>
                  <div className='display'>
                  <div>Please enter code to display test/survey:</div>
                     <Input value={testID} id='testID' placeholder="MongoDB ID" onChange={(e) => this.handleLookUpChange(e)}/>
                     <Button type="primary" style={{marginLeft: '.5vw', marginTop: '.5vh',  width: '135px' }} onClick={() => this.getTest()}>Submit</Button>
                  </div>
                  <div>{this.state.modify ? this.displayCreate() : <div></div>}</div>
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