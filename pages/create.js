import Layout from "../components/MyLayout";
import MultipleChoice from "../components/MultpleChoice";


import { Select, Button, Input, Switch } from "antd";
import "../styling/create.less";

const { Option } = Select;

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      testOrSurvey: true,
      testName: '',
      desc: '',
      currQuestionType: 'mc',
      questions: [],
    };
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
      
    console.log('changed:', checked );
  }

  getQuestionState = (state) => {
    this.setState((oldState) => ({questions: [...oldState.questions, state]}))
  }

  render () {
    const currQuestionType = this.state.currQuestionType;
    const testName = this.state.testName;
    const desc = this.state.desc;
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
                  style={{ width: "4.5vw", }}
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
                    <Button shape="circle" icon="plus" style={{ marginLeft: ".5vw" }} />
                  </div>
                </div>
                <div style={{display:'inline-block'}}>
                  <Button type="primary" style={{ marginLeft: "2vw", width: "135px" }}>
                    Create
                  </Button>
                </div>
              </div>
            </div>   
            <div id="createInput"></div>
            <hr style={{ width: "97%", marginTop: "1vh", marginBottom: "2vh" }} />
            <div className="createContents">
              <MultipleChoice callback={this.getQuestionState}/>
            </div>
          </Layout>
        </div>
      </>
    );
  }
}
  
export default Create;