const posts = [
  { id: 1, title: "Baba mi" },
  { id: 2, title: "Baba wa" },
  { id: 3, title: "Baba mi sir" },
];

const getPosts = () => posts;

export const getPostsLength = () => posts?.length;

export default getPosts;
