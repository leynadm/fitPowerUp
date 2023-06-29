import React, { useEffect, useState } from "react";


export function InstallPWA () {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e:any) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick = (evt:any) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>
        <div>Does it work Does it work Does it work</div>

    <button
      className="link-button"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      Install
    </button>
    </div>
  );
};

