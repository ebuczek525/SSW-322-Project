import Layout from '../components/MyLayout';
import Link from 'next/link';

const linkStyle = {
        marginRight: 15
      };

export default function Create() {
return (
<div>
   <Layout>
      <p>Please select an option to create a new test or survey.</p>
      <Link href="/test">
      <a style={linkStyle}>Create New Test</a>
    </Link>
      <Link href="/survey">
      <a style={linkStyle}>Create New Survey</a>
    </Link>
   </Layout>
</div>
);
}
