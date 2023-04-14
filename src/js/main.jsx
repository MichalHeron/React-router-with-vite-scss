import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import "../style/index.scss";
import '../style/index.scss'
import Root from '../routes/root'
import ErrorPage from '../routes/error-page'
import Contact from '../routes/contact'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'contacts/:contactId',
				element: <Contact />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)