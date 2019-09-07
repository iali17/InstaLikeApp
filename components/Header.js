import Link from 'next/link'

const linkStyle = {
    marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
            <a style={linkStyle}>About</a>
        </Link>
        <Link href="/graphql">
            <a style={linkStyle}>Database</a>
        </Link>
        <Link href="/signup">
            <a style={linkStyle}>Sign Up</a>
        </Link>
    </div>
)

export default Header