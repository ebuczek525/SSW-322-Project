import Layout from '../components/MyLayout';

function create_survey() {
        //
        
}

export default function Create() {
return (
<div>
   <Layout>
      <p>Add a Question:</p>
      <form>
          <select>
            <option value="choice">Multiple Choice</option>
            <option value="tf">True/False</option>
            <option value="sa">Short Answer</option>
            <option value="ea">Essay Answer</option>
            <option value="match">Matching</option>
            <option value="rank">Rank Choices</option>
          </select>
        <input type="submit" value="Add" />
      </form>
      <br></br>
      <p>Test/Survey Name:</p>
      <form>
         <input type="text" name="name" />
      </form>
      <br></br>
      <p>Add a Description:</p>
      <form>
         <input type="text" name="desc" />
      </form>
      <br></br><br></br>
      <button onClick={create_survey}>Create</button>
      <br></br><br></br>
   </Layout>
</div>
);
}