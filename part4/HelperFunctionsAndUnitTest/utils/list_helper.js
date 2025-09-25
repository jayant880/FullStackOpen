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

module.exports = {
    dummy, totalLikes, favoriteBlog
}