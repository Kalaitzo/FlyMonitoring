// routes/index.tsx
import {Header} from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import SignIn from "../islands/SignIn.tsx";

export default function Home() {
  return (
      <div class='bg-[#5C7EB5] h-screen'>
          <Header active={"/"} flag={false}/>
          <div className="flex py-32 px-20 gap-52 justify-center items-center">
              <SignIn/>
              <img src={"https://cdn-icons-png.flaticon.com/512/2974/2974498.png"}
                   alt={"Couldn't load image..."}
                   className={"w-1/4 h-1/4"}/>
          </div>
          <Footer/>
      </div>
  );
}


