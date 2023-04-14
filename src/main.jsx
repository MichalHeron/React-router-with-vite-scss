import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import "../style/index.scss";
import './style/index.scss'
import ErrorPage from './routes/error-page'
import Contact, { loader as contactLoader } from './routes/contact'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				path: 'contacts/:contactId',
				element: <Contact />,
				loader: contactLoader,
			},
		],
	},
	// {
	// 	path: "contacts/:contactId", // twozenie nowego routingu
	// 	element: <Contact />,
	//   },
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
