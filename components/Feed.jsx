'use client'

import React, { useContext, useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import basePathContext from '@/context/basePathContext'
import useSearchPosts from '@/hooks/useSearchPosts'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = ({ basePath }) => {
  const {
    searchText,
    posts,
    fetchPosts,
    handleSearchChange,
    handleSubmit,
    handleTagClick
  } = useSearchPosts()

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <basePathContext.Provider value={basePath}>
      <section className="feed">
        <form className="relative w-full flex-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a tag or username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>

        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      </section>
    </basePathContext.Provider>
  )
}

export default Feed
