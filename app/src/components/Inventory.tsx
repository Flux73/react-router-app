import type { Item } from "~/types/data";
import ItemRow from "./ItemRow";

const Inventory = function ({ data }: { data: Item[] }) {
	return (
		<s-table>
			<s-table-header-row>
				<s-table-header>Id</s-table-header>
				<s-table-header>Name</s-table-header>
				<s-table-header>Stock</s-table-header>
				<s-table-header>Claim Stock</s-table-header>
			</s-table-header-row>
			<s-table-body>
				{data.map((item: Item) => {
					return <ItemRow key={item.id} item={item} />;
				})}
			</s-table-body>
		</s-table>
	);
};

export default Inventory;
