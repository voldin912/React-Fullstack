const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const result = blogs
    .map(blog => blog.likes)
    .reduce((acc,cur) => acc + cur,0);
  return result;
};

const favoriteBlog = (blogs) => {
  const result = blogs
    .reduce((accumulator,current) => {
      if(!accumulator.length || accumulator[0].likes < current.likes) {
        delete current.__v;
        delete current._id;
        delete current.url;
        accumulator[0] = current;
      }
      return accumulator;
    }, []);
  console.log(result);
  return result[0] || 0;
};

const mostBlogs = (blogs) => {
  const countedBlogsByAuthor = Object.values(blogs.reduce((accumulator, current) => {
    if(accumulator[current.author]) {
      accumulator[current.author].blogs += 1;
    } else {
      accumulator[current.author] = {
        author: current.author,
        blogs:1
      };
    }
    return accumulator;
  }, {}));
  console.log(countedBlogsByAuthor);
  const mostBlogsAuthor = countedBlogsByAuthor.reduce((accumulator, current) => {
    if (!accumulator.length || accumulator[0].blogs < current.blogs) {
      accumulator[0] = current;
    }
    return accumulator;
  },[]);

  return mostBlogsAuthor[0] || 0;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
