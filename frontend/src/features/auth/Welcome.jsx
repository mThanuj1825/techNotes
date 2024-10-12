import { Link } from "react-router-dom";

export function Welcome() {
	const date = new Date();
	const today = new Intl.DateTimeFormat("en-US", {
		dateStyle: "full",
		timeStyle: "long",
	}).format(date);
	
	return (
		<section>
			<p>{ today }</p>
			<h1>Welcome!</h1>
			<p>
				<Link to={ "/dash/notes" }>View techNotes</Link>
			</p>
			<p>
				<Link to={ "/dash/users" }>View User Settings</Link>
			</p>
		</section>
	);
}