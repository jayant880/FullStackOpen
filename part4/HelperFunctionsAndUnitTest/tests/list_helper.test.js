const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const testBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
];

const singleBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
];

test('dummy returns one', () => {
    const result = listHelper.dummy([]);
    assert.strictEqual(result, 1);
});


describe('total Likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([]);
        assert.strictEqual(result, 0);
    });
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(singleBlog);
        assert.strictEqual(result, 5);
    });
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(testBlogs);
        assert.strictEqual(result, 36)
    });
});


describe('favorite blog', () => {
    test('of empty list returns undefined', () => {
        const result = listHelper.favoriteBlog([]);
        assert.deepStrictEqual(result, undefined)
    });
    test('when list has only one blog then returns that blog', () => {
        const result = listHelper.favoriteBlog(singleBlog);
        assert.deepStrictEqual(result, singleBlog[0]);
    })

    test('of a bigger list it returns the blog with most likes', () => {
        const expectedBlog = testBlogs[2];
        const result = listHelper.favoriteBlog(testBlogs);
        assert.deepStrictEqual(result, expectedBlog);
    })
});

describe('mostBlogs', () => {
    test('of empty list returns null', () => {
        const result = listHelper.mostBlogs([]);
        assert.strictEqual(result, null);
    });

    test('when list has only one blog returns that author with 1 blog', () => {
        const expected = {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        };
        const result = listHelper.mostBlogs(singleBlog);
        assert.deepStrictEqual(result, expected);
    });

    test('of a bigger list returns author with most blogs', () => {
        const expected = {
            author: 'Robert C. Martin',
            blogs: 3
        };
        const result = listHelper.mostBlogs(testBlogs);
        assert.deepStrictEqual(result, expected);
    });
});

describe('mostLikes', () => {
    test('of empty list returns null', () => {
        const result = listHelper.mostLikes([]);
        assert.strictEqual(result, null);
    });

    test('when list has only one blog returns that author with its likes', () => {
        const expected = {
            author: 'Edsger W. Dijkstra',
            likes: 5
        };
        const result = listHelper.mostLikes(singleBlog);
        assert.deepStrictEqual(result, expected);
    });

    test('of a bigger list returns author with most total likes', () => {
        const expected = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        };
        const result = listHelper.mostLikes(testBlogs);
        assert.deepStrictEqual(result, expected);
    });
});