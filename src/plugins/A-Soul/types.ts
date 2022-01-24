interface Data {
  time: string;
  msgUrl: String;
  post_Content: String;
  repost_Sender: String;
  repost_content: String;
  imgSrc: string;
  video_content: String;
  videoSrc: String;
}
interface Dates {
  name: String;
  data: Data;
}
export {Data, Dates};
