import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchResultPage from "./pages/SearchResultPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { MyProfilePage } from "./pages/MyProfilePage";
import { NearbyPage } from "./pages/NearbyPage";
import { StorePage } from "./pages/StorePage";
import { TitleLogo } from "./components/TitleLogo";
import { MyShoesPage } from "./pages/MyShoesPage";
import { ShoeStorePage } from "./pages/ShoeStorePage";
import OrderCheckPage from "./pages/OrderCheckPage";
import { useState, useEffect } from "react";
import { formatBalance } from "./utils";
import detectEthereumProvider from "@metamask/detect-provider";
import { WalkingPage } from "./pages/WalkingPage";

export const pageList = [
  {
    name: "Nearby",
    path: "nearby",
    components: <NearbyPage />,
    src: "/svg/map-01.png",
  },
  {
    name: "Leaderboard",
    path: "leaderboard",
    components: <LeaderboardPage />,
    src: "/svg/trophy-01.png",
  },
  {
    name: "Profile",
    path: "myprofile",
    components: <MyProfilePage />,
    src: "/svg/user-square.png",
  },
  {
    name: "식당",
    path: "store",
    components: <StorePage />,
    src: "",
  },
  {
    name: "결제 확인",
    path: "order_check",
    components: <OrderCheckPage />,
    src: "",
  },
  {
    name: "My Shoes Inventory",
    path: "myshoes",
    components: <MyShoesPage />,
    src: "",
  },
  {
    name: "NFT Shoes Store",
    path: "shoe_store",
    components: <ShoeStorePage />,
    src: "",
  },
  {
    name: "Walking",
    path: "walking",
    components: <WalkingPage />,
    src: "",
  },
];

let injectedProvider = false;

if (typeof window.ethereum !== "undefined") {
  injectedProvider = true;
  console.log(window.ethereum);
}

const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false;

export const myData = {
  name: "Jam Jam",
  mileage: 10000,
  shoes: [{ name: "Watermelon", mps: 11, pps: 10, price: 2000 }],
};

function App() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [], balance: "", chainId: "" };
  const [wallet, setWallet] = useState(initialState);

  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId: any) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain);
      }
    };

    getProvider();

    const switchToHardhatNetwork = async () => {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x7A69", // 31337 in hexadecimal for Hardhat Network
              chainName: "Hardhat Network",
              nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
              rpcUrls: ["http://127.0.0.1:8545"],
            },
          ],
        });
      } catch (addError: any) {
        console.error("Error switching to Hardhat Network:", addError.message);
        setError(true);
        setErrorMessage(addError.message);
      }
    };

    switchToHardhatNetwork();

    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, []);

  const updateWallet = async (accounts: any) => {
    console.log(accounts);
    const balance = formatBalance(
      await window.ethereum!.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      }),
    );
    const chainId = await window.ethereum!.request({
      method: "eth_chainId",
    });
    setWallet({ accounts, balance, chainId });
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: []) => {
        setError(false);
        updateWallet(accounts);
      })
      .catch((err: any) => {
        setError(true);
        setErrorMessage(err.message);
      });
    setIsConnecting(false);
  };

  const disableConnect = Boolean(wallet) && isConnecting;

  return (
    <>
      <NextUIProvider>
        <BrowserRouter basename="/">
          <TitleLogo />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search/:keyword" element={<SearchResultPage />} />
            {pageList.map((item, idx) => (
              <Route
                path={`/${item.path}`}
                key={idx}
                element={item.components}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </>
  );
}

export default App;
