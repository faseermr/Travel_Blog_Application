import AddBlog from "../component/AddBlog";
import BlogList from "../component/BlogList";
import Chat from "../component/Chat";
import EditBlog from "../component/EditBlog";
import MyBlog from "../component/MyBlog";
import Signin from "../component/Signin";
import Signup from "../component/Signup";

const routes = [
  {
    path: "/add-blog",
    name: "Add Blog",
    element: AddBlog,
  },
  {
    path: "/show-blog",
    name: "Show Blog",
    element: BlogList,
  },
  {
    path: "/my-blog",
    name: "My Blog",
    element: MyBlog,
  },
  {
    path: "/edit-blog/:id",
    name: "Edit Blog",
    element: EditBlog,
  },
  {
    path: "/signup",
    name: "Signup",
    element: Signup,
  },
  {
    path: "/signin",
    name: "Signin",
    element: Signin,
  },
  {
    path: "/chat",
    name: "Chat",
    element: Chat,
  },
];

export default routes;
