import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import { site } from "../config";

/**
 * A custom hook to invalidate a query in React Query, triggering a refetch.
 *
 * @returns An object containing:
 * - `invalidateQuery`: A function to invalidate the query.
 * - `isInvalidating`: A boolean indicating if the invalidation process is in progress.
 */
export function useInvalidateQuery() {
  // State to track whether the query is currently being invalidated
  const [isInvalidating, setIsInvalidating] = useState(false);

  // Access the React Query client
  const queryClient = useQueryClient();

  /**
   * Invalidates the given query key, causing it to refetch.
   */
  const invalidateQuery = useCallback(
    async (queryKey: QueryKey) => {
      setIsInvalidating(true);

      try {
        await queryClient.invalidateQueries({
          queryKey: queryKey,
          type: "all",
        });
      } catch (error) {
      } finally {
        setIsInvalidating(false);
      }
    },
    [queryClient]
  );

  const invalidateServerQuery = useCallback(async (tags: string[]) => {
    setIsInvalidating(true);

    try {
      await axios.post(
        "/revalidate-cache",
        { tags: tags },
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
    invalidateQuery, // Function to trigger query invalidation
    invalidateServerQuery, // Function to trigger query invalidation for server fetchs (nextjs cache)
    isInvalidating, // Boolean indicating if invalidation is in progress
  };
}
