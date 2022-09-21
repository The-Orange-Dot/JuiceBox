export interface UserType {
  data: {
    created_at: String;
    description: String;
    follower_count: Number;
    image: String;
    sub_points: Number;
    total_subs: Number;
    type: String | undefined;
    username: String;
    view_count: Number;
  };
}
