import React, { useEffect } from "react";
import styles from "../styles/styles";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useState } from "react";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div className={` ${styles.section} bg-pink-50 px-4 lg:px-12 `}>
      <div className="flex h-[calc(100vh-78px)]  overflow-hidden">
        <div className=" min-w-max px-2 lg:px-1 py-6 ">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <div className=" w-full py-6 pl-3 lg:px-10 ">
          <ProfileContent active={active} setActive={setActive} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
