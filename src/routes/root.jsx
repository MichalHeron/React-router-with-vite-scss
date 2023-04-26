import { useEffect } from 'react'
import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation } from 'react-router-dom'
import { getContacts, createContact } from '../contacts'

export async function action() {
	const contact = await createContact()
	return redirect(`/contacts/${contact.id}/edit`)
}

export async function loader({ request }) {
	const url = new URL(request.url)
	const q = url.searchParams.get('q')
	const contacts = await getContacts(q)
	return { contacts, q }
}

export default function Root() {
	const { contacts, q } = useLoaderData()
	const navigation = useNavigation()

	useEffect(() => {
		document.getElementById('q').value = q
	}, [q]) //updating search input after using comeback button

	return (
		<>
			<div id='sidebar'>
				<h1>React Router Contacts</h1>
				<div>
					{/* it does not have <form method="post">. The default method is "get" 
					Because this is a GET, not a POST, React Router does not call the action*/}
					<Form id='search-form' role='search'>
						<input id='q' aria-label='Search contacts' placeholder='Search' type='search' name='q' defaultValue={q} />
						{/* name of this input is q, that's why the URL has ?q=. */}
						<div id='search-spinner' aria-hidden hidden={true} />
						<div className='sr-only' aria-live='polite'></div>
					</Form>
					<Form method='post'>
						<button type='submit'>New</button>
					</Form>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map(contact => (
								<li key={contact.id}>
									<NavLink
										to={`contacts/${contact.id}`}
										className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}{' '}
										{contact.favorite && <span>★</span>}
									</NavLink>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
			</div>
			<div id='detail' className={navigation.state === 'loading' ? 'loading' : ''}>
				<Outlet />
			</div>
		</>
	)
}

// {/* <nav>
// 					<ul>
// 						<li>
// 							{/* <a href={`/contacts/1`}>Your Name</a>  nie ma ponownego renderowania calej storny dzieki zamianie na linkto */}
// 							<Link to={'/contacts/1'}>Your Name</Link>
// 						</li>
// 						<li>
// 							{/* <a href={`/contacts/2`}>Your Friend</a> */}
// 							<Link to={'/contacts/2'}>Your Friend</Link>
// 						</li>
// 					</ul>
// 				</nav> */}
