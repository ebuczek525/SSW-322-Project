import Layout from "../components/MyLayout";
import Link from "next/link";

import { Select, Button, Input, Switch } from "antd";
import "../styling/create.less";

const linkStyle = {
  marginRight: 15
};

function handleChange(value) {
  console.log(`selected ${value}`);
}

const { Option } = Select;
const { TextArea } = Input;

export default function Create() {
  return (
    <div>
      <Layout>
        <div className="create">
          <div id="createInput">
            <div>Test or Survey:</div>
            <Switch
              checkedChildren="Test"
              unCheckedChildren="Survey"
              defaultChecked
              style={{ width: "4.5vw" }}
            />
          </div>
          <div id="createInput">
            <div>Test Name:</div>
            <Input placeholder="Test Name" />
          </div>
          <div id="description">
            <div>Add a Description:</div>
            <TextArea rows={1} />
          </div>
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
          <div>
            <Button
              type="primary"
              style={{ marginLeft: "2vw", marginTop: "1vh", width: "135px" }}
            >
              Create
            </Button>
          </div>
        </div>
        <div id="createInput"></div>
        <hr style={{ width: "97%", marginTop: "1vh", marginBottom: "2vh" }} />
        <div className="createContents"></div>
      </Layout>
    </div>
  );
}
