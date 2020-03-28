import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/create">
      <a style={linkStyle}>Create Test/Survey</a>
    </Link>
    <Link href="/display">
      <a style={linkStyle}>Display Test/Survey</a>
    </Link>
  </div>
);

export default Header;