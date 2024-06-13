import Feed from '@/components/Feed'
import React from 'react'
import getConfig from 'next/config'

const Home = () => {
  const { publicRuntimeConfig } = getConfig()
  const { basePath } = publicRuntimeConfig

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts.
      </p>
      {/* Feed */}
      <Feed basePath={basePath} />
    </section>
  )
}

export default Home
