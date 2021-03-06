import Layout from "../components/MyLayout";
import MultipleChoice from "../components/MultpleChoice";
import TrueOrFalse from "../components/TrueOrFalse";
import ShortAnswer from "../components/ShortAnswer";
import Essay from "../components/Essay";
import RankedChoice from "../components/RankedChoice";

import { Select, Button, Input, Switch, message,} from "antd";
import axios from 'axios';
import "../styling/create.less";

import {Router} from 'next/router'



const { Option } = Select;

const handleRouteChange = (url) => {
  if(!confirm("Are you sure you want to change pages?")){
     window._cancel = true 
  }

}

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      testOrSurvey: true,
      testName: '',
      desc: '',
      currQuestionType: 'mc',
      questions: [],
      uploading: false,
    };
  }


  filtered = (raw) => {
    let allowed = ['testOrSurvey', 'testName', 'desc', 'questions', 'uploading'];
    Object.keys(raw)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});
  }

  handleCreate() {
    this.setState({
      uploading: true
    });
    axios.post('http://localhost:8080/create', this.state)
        .then((response) => {
          this.setState({
            testOrSurvey: true,
            testName: '',
            desc: '',
            questions: [],
            uploading: false,
          });
          message.success('Test Created Successfully');
          console.log(response);
        })
        .catch((error) => {
          this.setState({
            uploading: false,
          });
          message.error('Test Create Failed.');
          console.log(error);
        });
  }
  
  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
    console.log('changed:', e );
  }

  handleQuestionChange(value) {
    this.setState({currQuestionType: value});
    console.log('changed:', value );
  }

  handleSwitchChange = (checked) => {
    this.setState({testOrSurvey: checked});
    if (!this.state.testOrSurvey){

    }
    console.log('changed:', checked );
  }

  getQuestionState = (state) => {
    this.setState((oldState) => {
      if(!this.state.testOrSurvey){
        delete state.correctAnswer
      }
      oldState.questions[oldState.questions.findIndex(x => x.index === state.index)] = state
      console.log(this.state.questions)
      return {questions: oldState.questions}
    }, () => {console.log(this.state.questions)})
  }

  renderQuestions = () => {
    console.log(this.state.questions);
    return this.state.questions.map((question) => {
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
      state.questions.push( {
        type: this.state.currQuestionType,
        index: ('00000000000'+(Math.random().toString())).slice(-11)
      })
      return {questions: state.questions}
    }, () => console.log(this.state.questions))
  }

  removeQuestion = (index) => {
    console.log(index)
      this.setState((state) => ({ 
        questions: state.questions.filter((e) => !(e.index === index))
      }), () => console.log(this.state.questions))
  }

  render () {
    const currQuestionType = this.state.currQuestionType;
    const testName = this.state.testName;
    const desc = this.state.desc;
    const uploading = this.state.uploading;

    console.log(this.state);


    return (
      <>
        <div>
          <Layout>
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
                <Input value={testName} id='testName' placeholder="Test Name" onChange={(e) => this.handleChange(e)}/>
              </div>
              <div id="description">
                <div >Add a Description:</div>
                <Input value={desc} id='desc' onChange={(e) => this.handleChange(e)}/>
              </div>
              <div style={{marginLeft: '2vw', marginTop: "1vh"}}>
                <div style={{display:'inline-block'}}>
                    <div>Add a Question:</div>
                  <div>
                    <Select defaultValue="Multiple Choice" value={currQuestionType} onChange={(e) => this.handleQuestionChange(e)}>
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
                <div style={{display:'inline-block'}}>
                  <Button type="primary" style={{ marginLeft: "2vw", width: "150px"}} 
                  onClick={() => this.handleCreate()} loading={uploading}>
                      {uploading ? 'Uploading' : 'Create Test/Survey'}
                  </Button>
                </div>
              </div>
            </div>   
            <div id="createInput"></div>
            <hr style={{ width: "97%", marginTop: "1vh", marginBottom: "2vh" }} />
            <div className="createContents">
              {this.renderQuestions()}
            </div>
          </Layout>
        </div>
      </>
    );
  }
}
  
export default Create;