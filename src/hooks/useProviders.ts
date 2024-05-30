import { useEffect, useState } from "react";
import {
  EIP6963AnnounceProviderEvent,
  EIP6963ProviderDetail,
} from "web3/lib/commonjs/providers.exports";
import { Web3 } from "web3";

export function useProviders() {
  const [providers, setProviders] = useState<EIP6963ProviderDetail[]>([]);

    useEffect(() => {
      function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
        if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid))
          return;
        setProviders([...providers, event.detail]);
        console.log("onAnnouncement", providers);
      }

      // Listen for eip6963:announceProvider and call onAnnouncement when the event is triggered.
      // @ts-ignore
      window.addEventListener("eip6963:announceProvider", onAnnouncement);

      // Dispatch the event, which triggers the event listener in the MetaMask wallet.
      window.dispatchEvent(new Event("eip6963:requestProvider"));

      // Return a function that removes the event listern.
      return () => {
        // @ts-ignore
        window.removeEventListener("eip6963:announceProvider", onAnnouncement);
      }
    });

  return providers;
}
