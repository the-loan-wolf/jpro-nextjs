"use client";
import UserProfileBox from "../ui/UserProfileBox";
import { getDocument } from "../utils/firebase-fn";
// import { headers } from "next/headers";
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

type Map = {
  [key: number]: 1 | 2;
};

const LOADING = 1;
const LOADED = 2;
const itemStatusMap: Map = {};

const isItemLoaded = (index: number) => !!itemStatusMap[index];

const loadMoreItems = (startIndex: number, stopIndex: number) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 500)
  );
};

interface RowProps {
  index: number;
  style: React.CSSProperties; // inline styles react type
}

// Functional component for Row
const Row = React.memo(({ index, style }: RowProps) => {
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
});
Row.displayName = "Row";

export default function App() {
  // we are doing this to opt out of static rendering
  // const headersList = await headers();
  // const userAgent = headersList.get("user-agent");

  // let userProfiles: UserDocument[] = [];

  // try {
  //   userProfiles = (await getDocument()) as UserDocument[];
  // } catch (error) {
  //   console.error("Failed to fetch user profiles:", error);
  //   // return an error component or fallback
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p className="text-red-500">
  //         Failed to load profiles. Please try again later.
  //       </p>=
  //     </div>
  //   );
  // }

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height * 0.80;

  return (
    // <main className="mt-5 flex justify-center min-h-screen">
    //   <div
    //     className="flex justify-evenly flex-wrap gap-4 max-w-5xl"
    //   >
    //     {userProfiles.map((user) => (
    //       <UserProfileBox
    //         key={user.id}
    //         userData={{
    //        =   uid: user.id,
    //           pic: user.profilePicEle,
    //           name: `${user.resumeFName} ${user.resumeLName}`,
    //           occupation: user.compPost,
    //           salary: user.salary,
    //         }}
    //       />
    //     ))}
    //   </div>
    // </main>

    <main className="mt-5 flex justify-center min-h-screen">
      <div className="flex justify-evenly flex-wrap gap-4 max-w-5xl">
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={1000}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={screenHeight}
              itemCount={1000}
              itemSize={30}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={screenWidth}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
      </div>
    </main>
  );
}
