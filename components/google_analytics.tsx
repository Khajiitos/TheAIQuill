import Script from "next/script";

export default async function GoogleAnalytics(props: {trackingID: string}) {
    return (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${props.trackingID}`}
            strategy="afterInteractive"
          />
          <Script strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', '${props.trackingID}');
            `}
          </Script>
        </>
      );
}