import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/ui/layout";
import PostEditor from "./pages/PostEditor";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from "sonner";
import ProtectedRoute from "./route/ProtectedRoute";
import PublicRoute from "./route/PublicRoute";
import AllPosts from "./pages/AllPosts";
import MyPost from "./pages/MyPost";
import EditPost from "./pages/EditPost";
import { BlogProvider } from "./context/blogContext";

function App() {
	return (
		<BrowserRouter>
			<BlogProvider>
				<Routes>
					{/* Routes with sidebar */}
					<Route element={<ProtectedRoute />}>
						<Route element={<Layout />}>
							<Route path="/" element={<Dashboard />} />
							<Route path="/post-editor" element={<PostEditor />} />

							<Route path="/all-posts/" element={<AllPosts />} />
							<Route path="/post-detail/:id" element={<BlogDetails />} />

							<Route path="/my-posts/" element={<MyPost />} />
							<Route path="/edit-post/:id" element={<EditPost />} />
						</Route>
					</Route>

					{/* Routes without sidebar */}
					<Route element={<PublicRoute />}>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Route>
				</Routes>
			</BlogProvider>
			<Toaster position="top-right" />
		</BrowserRouter>
	);
}

export default App;
