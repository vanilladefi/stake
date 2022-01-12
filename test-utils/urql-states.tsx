import { CombinedError } from "urql";
import { never, fromValue } from "wonka";

export const fetchingState = {
  executeQuery: () => never,
};
export const responseState = {
  executeQuery: () =>
    fromValue({
      data: {
        posts: [
          { id: 1, title: "Post title", content: "This is a post" },
          { id: 3, title: "Final post", content: "Final post here" },
        ],
      },
    }),
};

export const errorState = {
  executeQuery: () =>
    fromValue({
      error: new CombinedError({
        networkError: Error("something went wrong!"),
      }),
    }),
};
