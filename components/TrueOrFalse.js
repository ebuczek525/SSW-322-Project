import React from 'react';

import { Input, Radio, Button} from "antd";

import "../styling/question.less"


class TrueOrFalse extends React.Component {  
    constructor(props) {
        super(props);
    
        if (this.props.editable){
          this.state = {
            type: 'tf',
            question: '',
            correctAnswer: true,
            answers: [true, false],
            value: '',
            index: this.props.index,
          };

        }else if(this.props.takeable){
          this.state = this.props.question;
          this.props.callback(this.state);
        } else {
          this.state = this.props.callback()
        }
        
      }

      handleQuestionChange(e) {
        this.setState({[e.target.id]: e.target.value}, () => {this.props.callback(this.state)});
        console.log('changed:', e );
      }

      onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
          ...(!this.props.takeable && { correctAnswer: (e.target.value)})
        }, () => {this.props.callback(this.state)});
      };


    render() {
        const question = this.state.question;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };

        if (this.props.editable)  {
          return (
              <>
                <div className="multipleChoice">
                  <div >
                    <div id="question" style={{display: 'inline-block'}}>      
                        Question:
                        <Input value={question} id='question' placeholder="Enter Question..." onChange={(e) => this.handleQuestionChange(e)}/>
                    </div>
                    <div style={{display: 'inline-block', marginLeft: '2vw', marginRight: '2vw' }}>
                    <Button shape="circle" icon="delete" onClick={() => {this.props.removeItself(this.state.index)}}/>
                    </div>
                  </div>
                  <div id="answers">
                  <Radio.Group onChange={this.onChange} value={this.state.value}>
                      <Radio style={radioStyle} value={true}>
                        True
                      </Radio>
                      <Radio style={radioStyle} value={false}>
                        False
                      </Radio>
                  </Radio.Group>
                  </div>
                </div>
                <hr style={{ width: "97%", marginTop: "3vh", marginBottom: "3vh" }} />
              </>   
          );
        } else {
            return (
              <>
                <div className="multipleChoice">
                  <div >
                    <div id="question" style={{display: 'inline-block'}}>      
                        Question:
                        <Input disabled value={question} id='question' placeholder="Enter Question..." onChange={(e) => this.handleQuestionChange(e)}/>
                    </div>
                    <div style={{display: 'inline-block', marginLeft: '2vw', marginRight: '2vw' }}>
                    </div>
                  </div>
                  <div id="answers">
                  <Radio.Group onChange={this.onChange} value={this.state.value}>
                      <Radio style={radioStyle} value={true}>
                        True
                      </Radio>
                      <Radio style={radioStyle} value={false}>
                        False
                      </Radio>
                  </Radio.Group>
                  </div>
                </div>
                <hr style={{ width: "97%", marginTop: "3vh", marginBottom: "3vh" }} />
              </>   
          );
        }
    }
}

export default TrueOrFalse;