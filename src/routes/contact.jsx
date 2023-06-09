import { Form, useFetcher, useLoaderData } from 'react-router-dom'
import { getContact, updateContact } from '../contacts'

export async function loader({ params }) {
	const contact = await getContact(params.contactId)
	if (!contact) {
		throw new Response("", {
		  status: 404,
		  statusText: "Not Found",
		});
	  }
	return { contact }
}

export async function action({ request, params }) {
	let formData = await request.formData()
	return updateContact(params.contactId, {
		favorite: formData.get('favorite') === 'true',
	})
}

export default function Contact() {
	const { contact } = useLoaderData()
	// const contact = {
	// 	first: 'Your',
	// 	last: 'Name',
	// 	avatar: 'https://placekitten.com/g/200/200',
	// 	twitter: 'your_handle',
	// 	notes: 'Some notes',
	// 	favorite: true,
	// }

	return (
		<div id='contact'>
			<div>
				<img key={contact.avatar} src={contact.avatar || null} />
			</div>

			<div>
				<h1>
					{contact.first || contact.last ? (
						<>
							{contact.first} {contact.last}
						</>
					) : (
						<i>No Name</i>
					)}{' '}
					<Favorite contact={contact} />
				</h1>

				{contact.twitter && (
					<p>
						<a target='_blank' href={`https://twitter.com/${contact.twitter}`}>
							{contact.twitter}
						</a>
					</p>
				)}

				{contact.notes && <p>{contact.notes}</p>}

				<div>
					<Form action='edit'>
						<button type='submit'>Edit</button>
					</Form>
					<Form
						method='post'
						action='destroy'
						onSubmit={event => {
							if (!confirm('Please confirm you want to delete this record.')) {
								event.preventDefault()
							}
						}}>
						<button type='submit'>Delete</button>
					</Form>
				</div>
			</div>
		</div>
	)
}

function Favorite({ contact }) {
	const fetcher = useFetcher() // it will call the action. Since there is no <fetcher.Form action="..."> prop, it will post to the route where the form is rendered.
	// yes, this is a `let` for later
	let favorite = contact.favorite

	if (fetcher.formData) {
		favorite = fetcher.formData.get('favorite') === 'true'
	} //added for immediately star change - dont wait from serever response - we dont have any lags (The fetcher knows the form data being submitted to the action, so it's available to you on fetcher.formData. We'll use that to immediately update the star's state, even though the network hasn't finished. If the update eventually fails, the UI will revert to the real data.)

	return (
		<fetcher.Form method='post'>
			<button
				name='favorite'
				value={favorite ? 'false' : 'true'}
				aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
				{favorite ? '★' : '☆'}
			</button>
		</fetcher.Form>
	)
}
