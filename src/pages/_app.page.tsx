import '../../styles/global/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from "recoil";
import { FloatingNotificationBar } from "../store/floatingNotificationBar/FloatingNotificationBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <RecoilRoot>
        <FloatingNotificationBar />
        <Component {...pageProps} />
      </RecoilRoot>
    )
}

export default MyApp
