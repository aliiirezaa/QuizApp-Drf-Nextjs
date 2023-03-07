import Head from 'next/head'

import Navbar from '@/components/Navbar'

function Layout({ title, content, children }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={content} />
                <script src="https://accounts.google.com/gsi/client" ></script> 
            </Head>
                
            
            <Navbar/>
            <main>
                {children}
            </main>
           
        </>
    )
}
Layout.defaultProps = {
    title: 'کوییز |',
    content: 'این یه سایت تستی هست'
}
export default Layout