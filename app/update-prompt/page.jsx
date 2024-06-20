'use client'
import React, { useEffect, useState, Suspense } from 'react'
import Form from '@/components/Form'
import { useRouter, useSearchParams } from 'next/navigation'

const EditPrompt = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      if (response.ok) {
        const data = await response.json()
        setPost({
          prompt: data.prompt,
          tag: data.tag
        })
      } else {
        console.log(await response.json())
      }
    }

    if (promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async e => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) return alert('Prompt not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Suspense>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  )
}

export default EditPrompt
