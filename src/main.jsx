import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import "../style/index.scss";
import './style/index.scss'
import ErrorPage from './routes/error-page'
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import EditContact, { action as editAction } from './routes/edit'
import { action as destroyContact } from './routes/destroy'
import Index from './routes/index'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Index /> },
					{
						path: 'contacts/:contactId',
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: 'contacts/:contactId/edit',
						element: <EditContact />,
						loader: contactLoader, //There is no reason to attempt to share loaders among routes, they usually have their own
						action: editAction,
					},
					{
						path: 'contacts/:contactId/destroy',
						action: destroyContact, //destroyAction
						errorElement: <div>Oops! There was an error.</div>,
					},
				],
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



// JSX Routes
// And for our final trick, many folks prefer to configure their routes with JSX. You can do that with createRoutesFromElements. There is no functional difference between JSX or objects when configuring your routes, it's simply a stylistic preference.

// import {
// 	createRoutesFromElements,
// 	createBrowserRouter,
//   } from "react-router-dom";
  
//   const router = createBrowserRouter(
// 	createRoutesFromElements(
// 	  <Route
// 		path="/"
// 		element={<Root />}
// 		loader={rootLoader}
// 		action={rootAction}
// 		errorElement={<ErrorPage />}
// 	  >
// 		<Route errorElement={<ErrorPage />}>
// 		  <Route index element={<Index />} />
// 		  <Route
// 			path="contacts/:contactId"
// 			element={<Contact />}
// 			loader={contactLoader}
// 			action={contactAction}
// 		  />
// 		  <Route
// 			path="contacts/:contactId/edit"
// 			element={<EditContact />}
// 			loader={contactLoader}
// 			action={editAction}
// 		  />
// 		  <Route
// 			path="contacts/:contactId/destroy"
// 			action={destroyAction}
// 		  />
// 		</Route>
// 	  </Route>
// 	)
//   );
