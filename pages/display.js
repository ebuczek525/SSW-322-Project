import Layout from '../components/MyLayout';

export default function Display() {
return (
<div>
   <Layout>
      <p>Please enter code to display test/survey:</p>
      <form>
         <input type="text" name="ID_code" />
         <input type="submit" value="Submit" />
      </form>
   </Layout>
</div>
);
}
