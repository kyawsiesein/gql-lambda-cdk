export const addPost = (parent: any, args: any) => {
  const { id, title, body } = args;
  return {
    id,
    title,
    body,
  };
};
