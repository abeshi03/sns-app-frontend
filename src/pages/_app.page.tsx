import '../../styles/global/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from "recoil";
import { SideBar } from "../components/layouts/SideBar/SideBar";
import { FloatingNotificationBar } from "../store/floatingNotificationBar/FloatingNotificationBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <RecoilRoot>
        <FloatingNotificationBar />
        <SideBar>
          <Component {...pageProps} />
        </SideBar>
      </RecoilRoot>
    )
}

export default MyApp
