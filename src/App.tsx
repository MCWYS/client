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
import OrderCheckPage from "./pages/OrderCheckPage";
import { useState, useEffect } from "react";
import { formatBalance, formatChainAsNum } from "./utils";
import detectEthereumProvider from "@metamask/detect-provider";

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
    path: "orderCheck",
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
    path: "shoesStore",
    components: <MyShoesPage />,
    src: "",
  },
];

let injectedProvider = false;

if (typeof window.ethereum !== "undefined") {
  injectedProvider = true;
  console.log(window.ethereum);
}

const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false;

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
            <Route path="/myshoes" element={<MyShoesPage />} />
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
      <div>Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist</div>
      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <button
          style={{ border: "3px solid red" }}
          disabled={disableConnect}
          onClick={handleConnect}
        >
          Connect MetaMask
        </button>
      )}

      {wallet.accounts.length > 0 && (
        <>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </>
      )}
      {error && (
        <div onClick={() => setError(false)}>
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </>
  );
}

export default App;
