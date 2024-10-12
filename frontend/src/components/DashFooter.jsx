import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";

export function DashFooter() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	
	function onGoHomeClicked() {
		navigate("/dash");
	}
	
	let goHomeButton = null;
	if (pathname !== "/dash") {
		goHomeButton = (
			<button title={ "Home" } onClick={ onGoHomeClicked }>
				<FontAwesomeIcon icon={ faHouse } />
			</button>
		);
	}
	
	return (
		<footer>
			{ goHomeButton }
			<p>Current User: </p>
			<p>Status: </p>
		</footer>
	);
}