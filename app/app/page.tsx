import UserProfileBox from "../ui/UserProfileBox";
import { getDocument } from "../utils/firebase-fn";
import { headers } from 'next/headers'
import React, { PureComponent } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

// Define the document type
interface UserDocument {
  id: string;
  profilePicEle: string;
  resumeFName: string;
  resumeLName: string;
  compPost: string;
  salary: string;
}

const LOADING = 1;
const LOADED = 2;
const itemStatusMap = {};

const isItemLoaded = (index) => !!itemStatusMap[index];
const loadMoreItems = (startIndex, stopIndex) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise((resolve) =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 2500)
  );
};

class Row extends PureComponent {
  render() {
    const { index, style } = this.props;
    let label;
    if (itemStatusMap[index] === LOADED) {
      label = `Row ${index}`;
    } else {
      label = "Loading...";
    }
    return (
      <div className="ListItem" style={style}>
        {label}
      </div>
    );
  }
}

export default async function App() {
  // we are doing this to opt out of static rendering
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')

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
    // <main className="mt-5 flex justify-center min-h-screen">
    //   <div
    //     className="flex justify-evenly flex-wrap gap-4 max-w-5xl"
    //   >
    //     {userProfiles.map((user) => (
    //       <UserProfileBox
    //         key={user.id}
    //         userData={{
    //           uid: user.id,
    //           pic: user.profilePicEle,
    //           name: `${user.resumeFName} ${user.resumeLName}`,
    //           occupation: user.compPost,
    //           salary: user.salary,
    //         }}
    //       />
    //     ))}
    //   </div>
    // </main>
    <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={1000}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={150}
              itemCount={1000}
              itemSize={30}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={300}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
  );
}
