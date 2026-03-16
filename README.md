# Dashboard Implementation

## Task 2:

Each inventory row has its own `useFetcher({ key: claim-${item.id} })` instance so concurrent claims on different rows are fully independent.

When "Claim One" is clicked, the stock count decrements instantly by reading `fetcher.formData` before the server responds. Once the action completes, `fetcher.data` holds the updated item returned from the server, which becomes the new baseline to prevent stale values:

```ts
const currentStock = fetcher.data?.stock ?? item.stock;
const stockVal = fetcher.state !== "idle" ? currentStock - 1 : currentStock;
```

Double submission is prevented by swapping the button for a loading state while `fetcher.state !== "idle"`. Rollback is automatic if the action throws, `fetcher.state` returns to `"idle"` and the UI reverts to the last known stock value.

`shouldRevalidate` is set to skip revalidation after POST requests to prevent concurrent fetchers from being blocked during loader revalidation:

```ts
export function shouldRevalidate({ formMethod }) {
	return formMethod !== "POST";
}
```

## Task 3:

A route-level `ErrorBoundary` is exported from `dashboard.tsx`. It renders the full page shell with an error banner so the layout stays intact on failure. The retry button uses `useRevalidator` to re-run the loader without a full page refresh, triggering the `<Suspense>` fallback spinner while data reloads.
