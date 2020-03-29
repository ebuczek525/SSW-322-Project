
import Layout from '../components/MyLayout';
function new_test() {
    //Navigate to page to create new test
    }
    function new_survey() {
    //Navigate to page to create new survey
    }
    
    export default function Create() {
    return (
    <div >
       <Layout>
          <p>Please select an option to create a new test or survey.</p>
          <button onClick={new_test}>Create New Test</button>
          <br></br><br></br>
          <button onClick={new_survey}>Create New Survey</button>
       </Layout>
    </div>
    );
    }