import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
import '@/styles/globals.css'
import getConfig from 'next/config'

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & share AI Prompts'
}

const RootLayout = ({ children }) => {
  const { publicRuntimeConfig } = getConfig()
  const { basePath } = publicRuntimeConfig

  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav basePath={basePath} />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
