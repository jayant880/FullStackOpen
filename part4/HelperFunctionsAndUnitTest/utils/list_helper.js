const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const result = blogs.reduce((sum, item) => sum + item.likes, 0);
    return result;
}

const favoriteBlog = (blogs) => {
    let index = 0;
    let max = -1;
    blogs.forEach((blog, i) => {
        if (blog.likes > max) {
            max = blog.likes;
            index = i;
        };
    });
    return blogs[index];
}

const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null;
    }

    const authorCounts = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + 1;
        return counts;
    }, {});

    const [author, blogsCount] = Object.entries(authorCounts)
        .reduce((max, current) => current[1] > max[1] ? current : max);

    return {
        author,
        blogs: blogsCount
    };
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}