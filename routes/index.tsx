// routes/index.tsx
import {Header} from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import SignIn from "../islands/SignIn.tsx";

export default function Home() {
  return (
      <div className={'flex h-screen flex-col bg-[#5C7EB5]'}>
          <Header active={"/"} flag={false}/>
          <div className={"flex bg-[#5C7EB5] flex-1 py-5 gap-52 justify-center items-center"}>
              <SignIn/>
              <img src={"https://cdn-icons-png.flaticon.com/512/2974/2974498.png"}
                   alt={"Couldn't load image..."}
                   className={"w-1/4"}/>
          </div>
          <Footer/>
      </div>
  );
}


