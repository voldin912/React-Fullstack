const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const result = blogs
    .map(blog => blog.likes)
    .reduce((acc,cur) => acc + cur,0);
  return result;
};

module.exports = {
  dummy,
  totalLikes
};
