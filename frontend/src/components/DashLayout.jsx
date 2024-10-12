import { Outlet } from "react-router-dom";
import { DashFooter } from "./DashFooter.jsx";
import { DashHeader } from "./DashHeader.jsx";

export function DashLayout() {
	return (
		<>
			<DashHeader />
			<div>
				<Outlet />
			</div>
			<DashFooter />
		</>
	);
}