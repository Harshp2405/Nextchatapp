import Leftsidebar from "@/components/Leftsidebar";
import Rightside from "@/components/Rightside";


export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Leftsidebar />
      <div className="h-screen xl:mr-90 mr-0 md:ml-90 ml-0">{children}</div>
      {/* <Rightside /> */}
    </div>
  );
}