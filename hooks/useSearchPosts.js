import { useState, useEffect } from 'react'

const useSearchPosts = (initialSearchText = '') => {
  const [searchText, setSearchText] = useState(initialSearchText)
  const [posts, setPosts] = useState([])
  const [timeoutId, setTimeoutId] = useState(null)

  // 获取所有 prompt
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    setPosts(data)
  }

  // 根据搜索关键词获取 prompt
  const fetchSearchPosts = async () => {
    const response = await fetch('/api/prompt/search?searchText=' + searchText)
    const data = await response.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // 防抖
  useEffect(() => {
    if (searchText.trim()) {
      const newTimeout = setTimeout(() => {
        fetchSearchPosts()
      }, 1000)
      setTimeoutId(newTimeout)
      console.log('set!', newTimeout)
      return () => clearTimeout(newTimeout)
    } else {
      fetchPosts()
      return () => clearTimeout(timeoutId)
    }
  }, [searchText])

  const handleSearchChange = e => {
    setSearchText(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('clear by submit', timeoutId)
    clearTimeout(timeoutId)
    fetchSearchPosts()
  }

  const handleTagClick = tag => {
    setSearchText(tag)
    // 立即触发类型，清除定时器
    setTimeout(() => {
      console.log('clear by tag', timeoutId)
      clearTimeout(timeoutId)
      fetchSearchPosts()
    }, 0)
  }

  return {
    searchText,
    posts,
    fetchPosts,
    handleSearchChange,
    handleSubmit,
    handleTagClick
  }
}

export default useSearchPosts
