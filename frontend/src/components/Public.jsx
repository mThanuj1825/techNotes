import { Link } from "react-router-dom";

export function Public() {
	return (
		<section>
			<header>
				<h1>Welcome to <span>Dan D. Repairs!</span></h1>
			</header>
			<main>
				<p>Located in Beautiful Downtown Foo City, Dan D. Repairs provides a trained staff ready to meet your tech
				   repair needs.</p>
				<address>
					Dan D. Repairs <br />
					555 Foo Drive <br />
					Foo City, CA 12345 <br />
					<a href={ "tel:+155555555555" }>(555) 555-5555</a>
				</address>
				<br />
				<p>Owner: Dan Davidson</p>
			</main>
			<footer>
				<Link to={ "/login" }>Employee Login</Link>
			</footer>
		</section>
	);
}