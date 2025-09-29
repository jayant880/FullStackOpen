import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Login from "./components/Login";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        showNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        );
      })
      .catch(() => {
        showNotification("Error creating blog", "error");
      });
  };

  const updateBlog = (id, updatedBlog) => {
    const blogToUpdate = {
      ...updatedBlog,
      user: updatedBlog.user.id || updatedBlog.user,
    };

    blogService
      .update(id, blogToUpdate)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)));
        showNotification(`blog ${returnedBlog.title} updated`);
      })
      .catch(() => {
        showNotification("Error updating blog", "error");
      });
  };

  const deleteBlog = (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        showNotification(
          `blog ${blogToDelete.title} by ${blogToDelete.author} removed`
        );
      })
      .catch(() => {
        showNotification("Error deleting blog", "error");
      });
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  if (user === null) {
    return (
      <div>
        <Notification
          message={notification?.message}
          type={notification?.type}
        />
        <Login
          setUser={setUser}
          setErrorMessage={(msg) => showNotification(msg, "error")}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notification?.message} type={notification?.type} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
