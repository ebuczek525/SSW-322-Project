import Layout from "../components/MyLayout";

import { Select, Button, Input, Switch } from "antd";
import "../styling/create.less";


function handleChange(value) {
  console.log(`selected ${value}`);
}

const { Option } = Select;

class Create extends React.Component {
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
            <div className="create">
              <div id="createInput">
                <div style={{marginBottom: '0.5vh'}}>Test or Survey:</div>
                <Switch
                  checkedChildren="Test"
                  unCheckedChildren="Survey"
                  defaultChecked
                  style={{ width: "4.5vw", }}
                />
              </div>
              <div id="createInput">
                <div>Test Name:</div>
                <Input placeholder="Test Name" />
              </div>
              <div id="description">
                <div >Add a Description:</div>
                <Input />
              </div>
              <div style={{marginLeft: '2vw', marginTop: "1vh"}}>
                <div style={{display:'inline-block'}}>
                    <div>Add a Question:</div>
                  <div>
                    <Select defaultValue="Multiple Choice" onChange={handleChange}>
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
            <div className="createContents"></div>
          </Layout>
        </div>
      </>
    );
  }
}
  
export default Create;