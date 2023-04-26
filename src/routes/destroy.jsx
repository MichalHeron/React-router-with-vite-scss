import { redirect } from 'react-router-dom'
import { deleteContact } from '../contacts'

export async function action({ params }) {
	// throw new Error("oh dang!");// "wyzwalacz" przyklad pokazujacy ze mozna wyswietlac bledy w oknach
	await deleteContact(params.contactId)
	return redirect(`/`)
}
