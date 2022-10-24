/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Context } from "../context";
import { createRouter } from "../createRouter";
// import { Post } from "@prisma/client";
// import { Subscription, TRPCError } from "@trpc/server";
// import { EventEmitter } from "events";
import { z } from "zod";

// interface MyEvents {
//   add: (data: Post) => void;
//   isTypingUpdate: () => void;
// }
// declare interface MyEventEmitter {
//   on<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
//   once<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
//   emit<U extends keyof MyEvents>(
//     event: U,
//     ...args: Parameters<MyEvents[U]>
//   ): boolean;
// }
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// class MyEventEmitter extends EventEmitter {}

// const ee = new MyEventEmitter();

// // who is currently typing, key is `name`
// const currentlyTyping: Record<string, { lastTyped: Date }> =
//   Object.create(null);

// // every 1s, clear old "isTyping"
// const interval = setInterval(() => {
//   let updated = false;
//   const now = Date.now();
//   for (const [key, value] of Object.entries(currentlyTyping)) {
//     if (now - value.lastTyped.getTime() > 3e3) {
//       delete currentlyTyping[key];
//       updated = true;
//     }
//   }
//   if (updated) {
//     ee.emit("isTypingUpdate");
//   }
// }, 3e3);
// process.on("SIGTERM", () => clearInterval(interval));

// const getNameOrThrow = (ctx: Context) => {
//   const name = ctx.session?.user?.name;
//   if (!name) {
//     throw new TRPCError({ code: "FORBIDDEN" });
//   }
//   return name;
// };

export const userRouter = createRouter()
  // create
  .mutation("addUserById", {
    input: z.object({
      id: z.number().optional(),
      name: z.string(),
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      // const name = getNameOrThrow(ctx);
      const user = await ctx.prisma.user.create({
        data: {
          ...input,
        },
      });
      // ee.emit("add", post);
      // delete currentlyTyping[name];
      // ee.emit("isTypingUpdate");
      return user;
    },
  })
  .query("getAllUser", {
    input: z.object({}),
    async resolve({ input, ctx }) {
      // const take = input.take ?? 10;
      // const cursor = input.cursor;
      // `cursor` is of type `Date | undefined`
      // `take` is of type `number | undefined`
      const users = await ctx.prisma.user.findMany({});
      // const items = page.reverse();
      // let prevCursor: null | typeof cursor = null;
      // if (items.length > take) {
      //   const prev = items.shift();
      //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      //   prevCursor = prev!.createdAt;
      // }
      return {
        users,
      };
    },
  });
