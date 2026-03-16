import React from "react";
import { Await } from "react-router";
import type { Item } from "~/types/data";
import Inventory from "../components/Inventory";

export default function DashboardPage({ inventory }) {
	return (
		<s-page heading="Dashboard">
			<s-section padding="none">
				<React.Suspense
					fallback={
						<s-stack alignItems="center" gap="base" padding="large">
							<s-spinner
								accessibilityLabel="Loading products"
								size="large"
							/>
							<s-text>Loading Inventory...</s-text>
						</s-stack>
					}
				>
					<Await resolve={inventory}>
						{(data: Item[]) => <Inventory data={data} />}
					</Await>
				</React.Suspense>
			</s-section>
		</s-page>
	);
}
