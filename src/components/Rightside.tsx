"use client"
import Image from 'next/image';
import LogoutButton from './LogoutButton';
import { useGetUser } from '../../custom-hooks/useUser';

export default function Rightside (){

const {isLoading , user , isError} = useGetUser()

if(isLoading){
  return (
    <aside className="h-screen fixed top-0 right-0 w-[350px] border border-border xl:block">
      <p className="text-xl text-fuchsia-200 p-4">Loading...</p>
    </aside>
  );
}

if(isError){
      return (
        <aside className="h-screen fixed top-0 right-0 w-[350px] border border-border xl:block">
          <p className="text-xl text-fuchsia-200 p-4">Failed to load user</p>
        </aside>
      );
}

  return (
    <div className="">
      <aside className="h-screen fixed top-0 right-0 w-[350px] border-1 border-border xl:block">
        <div className="flex flex-col justify-between h-full p-4">
          <div className="flex items-center mt-10 flex-col">
            {user?.avatar && (
              <Image
                src={user.avatar}
                width={1000}
                height={1000}
                alt="Friend avatar"
                className="rounded-full h-35 w-35 bg-white object-cover"
              />
            )}
            <div className="flex items-center gap-2 my-4">
              <span className="h-3 w-3 bg-green-500 rounded-full"></span>
              <p className="text-white text-xl font-semibold">{user?.name}</p>
            </div>
            <div className="bg-border h-[1px] w-full my-5"></div>
            <p className="text-center text-md text-text-muted"> {user?.bio} </p>
          </div>
          <LogoutButton />
        </div>
      </aside>
    </div>
  );
};

