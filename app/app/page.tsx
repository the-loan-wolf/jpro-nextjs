import UserProfileBox from "../ui/UserProfileBox";
import { getDocument } from "../utils/firebase-fn";

// Define the document type
interface UserDocument {
  id: string;
  profilePicEle: string;
  resumeFName: string;
  resumeLName: string;
  compPost: string;
  salary: string;
}

export default async function App() {
  let userProfiles: UserDocument[] = [];

  try {
    userProfiles = await getDocument() as UserDocument[];
  } catch (error) {
    console.error("Failed to fetch user profiles:", error);
    // return an error component or fallback
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load profiles. Please try again later.</p>
      </div>
    );
  }

  return (
    <main className="mt-5 flex justify-center min-h-screen">
      <div
        className="flex justify-evenly flex-wrap gap-4 max-w-5xl"
      >
        {userProfiles.map((user) => (
          <UserProfileBox
            key={user.id}
            userData={{
              uid: user.id,
              pic: user.profilePicEle,
              name: `${user.resumeFName} ${user.resumeLName}`,
              occupation: user.compPost,
              salary: user.salary,
            }}
          />
        ))}
      </div>
    </main>
  );
}
