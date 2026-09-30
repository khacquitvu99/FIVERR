import UserProfile from "@/component/userprofile";
import Nav from "@/component/list-job/nav";

export const dynamic = "force-dynamic";

export default function UserProfilePage() {
  return (
    <div>
      <Nav/>
      <UserProfile />
    </div>
  );
}