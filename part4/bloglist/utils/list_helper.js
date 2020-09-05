const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((likes, blog) => {
    return (likes += blog.likes)
  }, 0)

  return likes
}

const favoriteBlog = (blogs) => {
  return maxOfObjectArray(blogs, "likes")
}

const maxOfObjectArray = (objectArray, compareProperty) => {
  const result = objectArray.reduce((maxElement, element) => {
    const maxValue =
      compareProperty in maxElement ? maxElement[compareProperty] : 0

    if (element[compareProperty] > maxValue) return element
    else return maxElement
  }, {})

  return result
}

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((authors, blog) => {
    const author = authors.find((element) => element.author === blog.author)

    if (author === undefined)
      return authors.concat({ author: blog.author, blogs: 1 })

    author["blogs"] += 1
    return authors
  }, [])

  if (!authors || !authors.length) return {}

  return maxOfObjectArray(authors, "blogs")
}

const mostLikes = (blogs) => {
  const authors = blogs.reduce((authors, blog) => {
    const author = authors.find((element) => element.author === blog.author)

    if (author === undefined)
      return authors.concat({ author: blog.author, likes: blog.likes })

    author["likes"] += blog.likes
    return authors
  }, [])

  if (!authors || !authors.length) return {}

  return maxOfObjectArray(authors, "likes")
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes,
  favoriteBlog
}
