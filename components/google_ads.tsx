
import Script from "next/script";

export default function GoogleAds(props: {client: string}) {
    return (
        <Script id="google-ads" async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${props.client}`}
            crossOrigin="anonymous"></Script>
      );
}