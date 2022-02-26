type PostType = {
  title: string,
  message: string,
  firstName: string,
  lastName: string,
  creator: string,
  tags: [string],
  selectedFile: string,
  video: string,
  likes: [string],
  createdAt: Date,
  _id: string
}
export default PostType;
