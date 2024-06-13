import Prompt from '@/models/prompt'
import User from '@/models/user'
import { connectToDB } from '@/utils/database'

export const GET = async request => {
  const { searchParams } = new URL(request.url)
  const searchText = searchParams.get('searchText')

  try {
    await connectToDB()
    // 拆分关键词
    const keywordArray = searchText.split(' ').filter(kw => kw.trim() !== '')

    // 构建关键词表达式组
    const regexArray = keywordArray.map(kw => new RegExp(kw, 'i'))

    // 查询所有满足条件的用户
    const userConditions = regexArray.map(kw => ({ username: { $regex: kw } }))
    const users = await User.find({ $or: userConditions })
    const userIds = users.map(user => user._id)

    // 查询满足条件的prompts
    const prompts = await Prompt.find({
      $or: [
        { prompt: { $in: regexArray } },
        { tag: { $in: regexArray } },
        { creator: { $in: userIds } }
      ]
    }).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch prompts', { status: 500 })
  }
}
