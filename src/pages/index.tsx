import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const { data: users } = trpc.useQuery(["user.findManyUser", {}]);

  const { data: user } = trpc.useQuery([
    "user.findUniqueUser",
    { where: { id: 1 } },
  ]);

  const { data: posts } = trpc.useQuery(["post.findManyPost", {}]);

  const { isLoading, error, mutate } = trpc.useMutation(["post.createOnePost"]);

  console.log({ users }, { posts });
  console.log(user);

  return (
    <div>
      <button
        onClick={async () => {
          mutate({
            data: {
              author: {
                connect: {
                  id: 1,
                },
              },
              title: "p1",
              content: "content1",
            },
          });
        }}
      >
        add user
      </button>
    </div>
  );
}
