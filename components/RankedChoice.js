import React from 'react';

import { Input, Radio, Button, InputNumber} from "antd";

import "../styling/question.less"


class RankedChoice extends React.Component {  
    constructor(props) {
        super(props);
    
        this.state = {
            type: 'rc',
            question: '',
            correctAnswer: '',
            answers: [['',1],['',2],['',3],['',4]],
            value: '',
            index: this.props.index,
        };

        this.props.callback(this.state);
      }

      handleQuestionChange(e) {
        this.setState({[e.target.id]: e.target.value}, () => {this.props.callback(this.state)});
        console.log('changed:', e );
      }

      handleInputChange(e) {
        e.persist();
        console.log(e);
        this.setState((state) => {
          state.answers[parseInt(e.target.id)][0] = e.target.value
          return {answers: state.answers};
        }, () => {this.props.callback(this.state)});
        console.log('changed:', e );
      }

      handleNumberChange(e) {
        console.log(e);
        this.setState((state) => {
          state.answers[e.target.id][1] = e.target.value
          return {answers: state.answers};
        }, () => {this.props.callback(this.state)});
        console.log('changed:', e );
      }


    render() {
        const question = this.state.question;
        const answers = this.state.answers;

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
                <Input.Group compact>
                  <Input value={answers[0][0]} id='00' 
                    style={{ width: '45%' }} placeholder="Option 1..." 
                    onChange={(e) => this.handleInputChange(e)} />
                  <InputNumber value={answers[0][1]} id='0'
                    min={1} max={4}
                    placeholder={1} 
                    onChange={(e) => this.handleNumberChange({target:{id:0, value:e}})}/>
                </Input.Group>

                <Input.Group compact>
                  <Input value={answers[1][0]} id='01'
                    style={{ width: '45%' }} placeholder="Option 2..."
                    onChange={(e) => this.handleInputChange(e)}/>
                  <InputNumber value={answers[1][1]} id='1'
                    min={1} max={4}
                    placeholder={2} 
                    onChange={(e) => this.handleNumberChange({target:{id:1, value:e}})}/>
                </Input.Group>

                <Input.Group compact>
                  <Input value={answers[2][0]} id='02'
                    style={{ width: '45%' }} placeholder="Option 3..."
                    onChange={(e) => this.handleInputChange(e)}/>
                  <InputNumber value={answers[2][1]}  id='2'
                    min={1} max={4}
                    placeholder={3} 
                    onChange={(e) => this.handleNumberChange({target:{id:2, value:e}})}/>
                </Input.Group>

                <Input.Group compact>
                  <Input value={answers[3][0]} id='03'
                    style={{ width: '45%' }} placeholder="Option 4..." 
                    onChange={(e) => this.handleInputChange(e)}/>
                  <InputNumber value={answers[3][1]} id='3'
                    min={1} max={4}
                    placeholder={4} 
                    onChange={(e) => this.handleNumberChange({target:{id:3, value:e}})}/>
                </Input.Group>
                </div>
                </div>
              <hr style={{ width: "97%", marginTop: "3vh", marginBottom: "3vh" }} />
            </>   
        );
    }
}

export default RankedChoice;