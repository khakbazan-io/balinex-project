import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import { site } from "../config";

/**
 * A custom hook for invalidating client-side React Query caches
 * and triggering server-side revalidation for Next.js (via tags).
 *
 * This is useful when you need to manually refetch data or bust stale caches
 * both on the frontend (React Query) and backend (Next.js caching layers).
 *
 * @returns An object containing:
 * - `invalidateQuery`: Invalidate a React Query key (client-side cache).
 * - `invalidateServerQuery`: Trigger Next.js server cache revalidation via API.
 * - `isInvalidating`: A boolean flag to indicate if any invalidation is in progress.
 */
export function useInvalidateQuery() {
  // Tracks whether a query invalidation (client or server) is currently happening
  const [isInvalidating, setIsInvalidating] = useState(false);

  // Access the React Query client for cache control
  const queryClient = useQueryClient();

  /**
   * Invalidates a local React Query cache entry by its key.
   * This triggers a refetch on the next render or usage.
   *
   * @param queryKey - The query key to invalidate (same as used in `useQuery`)
   */
  const invalidateQuery = useCallback(
    async (queryKey: QueryKey) => {
      setIsInvalidating(true);

      try {
        await queryClient.invalidateQueries({
          queryKey,
          type: "all", // Invalidate active + inactive queries
        });
      } catch (error) {
      } finally {
        setIsInvalidating(false);
      }
    },
    [queryClient]
  );

  /**
   * Triggers server-side cache invalidation (e.g., Next.js `revalidateTag`)
   * by calling a backend endpoint responsible for revalidation.
   *
   * @param tags - An array of tag names to revalidate on the server.
   */
  const invalidateServerQuery = useCallback(async (tags: string[]) => {
    setIsInvalidating(true);

    try {
      await axios.post(
        "/revalidate-cache",
        { tags },
        {
          baseURL: site.apiUrl.local,
        }
      );
    } catch (error) {
    } finally {
      setIsInvalidating(false);
    }
  }, []);

  return {
    invalidateQuery, // Invalidate React Query caches
    invalidateServerQuery, // Invalidate server-side cache (e.g. Next.js tag revalidation)
    isInvalidating, // Is any invalidation currently running
  };
}
