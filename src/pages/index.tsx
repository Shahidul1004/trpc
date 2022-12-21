import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const { data: users } = trpc.useQuery(["user.findManyUser", {include: {posts: {}}}]);

  const { data: user } = trpc.useQuery([
    "user.findUniqueUser",
    { where: { id: 1 } },
  ]);

  const { data: posts } = trpc.useQuery(["post.findManyPost", {}]);

  const {mutate: createUser} = trpc.useMutation(["user.createOneUser"])
  const {mutate: createPost} = trpc.useMutation(["post.createOnePost"])

  const { mutate : updateUser} = trpc.useMutation(["user.updateOneUser"])

  const { isLoading, error, mutate } = trpc.useMutation(["post.createOnePost"]);

  const {data: groupUser} = trpc.useQuery(["user.groupByUser", {by: ["id"], orderBy: {_min: {name: "asc"}}}])

  console.log({ users }, { posts });
  console.log(user);
  console.log(groupUser);

  return (
    <div>
      <button
        onClick={async () => {
          createUser({
            data: {name: "sony"}
          })
        }}
      >
        add user
      </button>
      <button
        onClick={async () => {
          createPost({
            data: {title: "post", author: {connect: {id: 1}}}
          })
        }}
      >
        add post
      </button>
      <button
        onClick={async () => {
          updateUser({
            where: {id: 1},
            data: {name: "sony yy", posts: {
              deleteMany: {id: 5},
              upsert: {
                where: {id: 10},
                create: {title: "new upsert"},
                update: {title: "updated upsert"}
              }
              
            }}
          })
        }}
      >
        update user
      </button>
    </div>
  );
}
