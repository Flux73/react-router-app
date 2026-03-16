import { useRevalidator } from "react-router";
import type { Route } from "../+types/root";
import { claimStock, getInventory } from "~/models/inventory.server";
import DashboardPage from "~/src/pages/DashboardPage";

export function ErrorBoundary() {
	const revalidator = useRevalidator();

	return (
		<s-page heading="Dashboard">
			<s-section padding="none">
				<s-banner heading="Error" tone="critical">
					Something went wrong.
					<s-button
						slot="secondary-actions"
						variant="secondary"
						onClick={() => revalidator.revalidate()}
					>
						Retry
					</s-button>
				</s-banner>
			</s-section>
		</s-page>
	);
}

export function shouldRevalidate({ formMethod }) {
	return formMethod !== "POST";
}

export async function loader() {
	const inventory = getInventory();

	return { inventory };
}

export async function action({ request }) {
	const formData = await request.formData();
	const id: string = formData.get("id");

	const item = await claimStock(id);

	return item;
}

const Dashboard = function ({ loaderData }: Route.ComponentProps) {
	const { inventory } = loaderData;

	return <DashboardPage inventory={inventory} />;
};

export default Dashboard;
