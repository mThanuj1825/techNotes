import { Link } from "react-router-dom";

export function DashHeader() {
	return (
		<header>
			<div>
				<Link to={ "/dash" }>
					<h1>techNotes</h1>
				</Link>
				<nav>
				
				</nav>
			</div>
		</header>
	);
}