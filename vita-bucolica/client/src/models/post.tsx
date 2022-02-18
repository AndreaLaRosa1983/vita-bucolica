type PostType = {
  title: string,
  message: string,
  name: string,
  creator: string,
  tags: [string],
  selectedFile: string,
  video: string,
  likes: [string],
  createdAt: Date,
  _id: string
}
export default PostType;
