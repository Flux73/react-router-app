import { useFetcher } from "react-router";
import type { Item } from "~/types/data";

export default function ItemRow({ item }: { item: Item }) {
	const fetcher = useFetcher({ key: `claim-${item.id}` });

	const stockVal =
		fetcher.state !== "idle"
			? (fetcher.data?.stock ?? item.stock) - 1
			: (fetcher.data?.stock ?? item.stock);

	return (
		<s-table-row>
			<s-table-cell>{item.id}</s-table-cell>
			<s-table-cell>{item.name}</s-table-cell>
			<s-table-cell>{stockVal}</s-table-cell>
			<s-table-cell>
				{stockVal > 0 || fetcher.state !== "idle" ? (
					<fetcher.Form method="post">
						<input type="hidden" name="id" value={item.id} />
						<s-button
							variant="primary"
							icon="plus"
							type="submit"
							disabled={fetcher.state !== "idle"}
							loading={fetcher.state !== "idle"}
						>
							Claim One
						</s-button>
					</fetcher.Form>
				) : (
					<s-badge>Out of Stock</s-badge>
				)}
			</s-table-cell>
		</s-table-row>
	);
}
