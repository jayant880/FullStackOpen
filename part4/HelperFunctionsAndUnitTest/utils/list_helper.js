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

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;

    const authorLikes = blogs.reduce((likes, blog) => {
        likes[blog.author] = (likes[blog.author] || 0) + blog.likes;
        return likes;
    }, {});

    const topAuthor = Object.entries(authorLikes).reduce((max, [author, count]) =>
        count > max.likes ? { author, likes: count } : max,
        { author: '', likes: 0 }
    );

    return topAuthor;
};

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}