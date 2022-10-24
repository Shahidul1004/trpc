/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from "../createRouter";
import { postsRouter } from "../trpc/routers/Post.router";
import { usersRouter } from "../trpc/routers/User.router";

export const appRouter = createRouter()
  .merge("user.", usersRouter)
  .merge("post.", postsRouter);

export type AppRouter = typeof appRouter;
