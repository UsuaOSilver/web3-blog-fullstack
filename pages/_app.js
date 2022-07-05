import { useState } from 'react'
import Link from 'next/link'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context.js'
import { ownerAddress } from '../config'
import 'easymde/dist/easymde.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  /** create local state to save account info after signin */
  const [account, setAccount] = useState(null)
  /** Web3modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          packages: WalletConnectProvider,
          options: {
            infuraId: 'a55d24261c534a599245e3eb82e6ad0b'
          },
        },
      },
    })
    return web3Modal
  } 
  
  /** the connect function use web3 nodal to connect to */
  async function connect() {
    try {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
      setAccount(accounts[0])
    } catch (err){
      console.log('error', err)
    }
  }
  
  return (
    <div>
      <nav className={nav}>
        <div className={header}>
          <Link href="/">
            <a>
              <img
                src="/logo.svg"
                alt="React Logo"
                style={{ width: '50px' }}
              />
            </a>
          </Link>
          <Link href="/">
            <a>
              <div className={titleContainer}>
                <h2 className={title}>Full Stack</h2>
                <p className={description}>WEB3</p>
              </div>
            </a>
          </Link>
          {
            !account && (
              <div className={buttonContainer}>
                <button className={buttonStyle} onClick={connect}>Connect</button>
              </div>
            )
          }
          {
            account && <p className={accountInfo}>{account}</p>
          }
        </div>
        <div className={linkContainer}>
          <Link href="/">
            <a className={link}>
              Home
            </a>
          </Link>
          {
            /** if the signed in user is the contract owner, we show the nav link to create a new post */
            (account === ownerAddress) && (
              <Link href="/create-post">
                <a className={link}>
                  Create Post
                </a>
              </Link>
            )
          }
        </div>
      </nav>
      <div className={container}>
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </div>
    </div>
  )
}

const accountInfo = css`
  width: 100%;
  display: flex;
  flex: 1;
  justify-contnent: flex-end;
  font-size: 12px;
`

const container = css`
  padding: 40px;
`

const linkContainer = css`
  padding: 30px 60ox;
  background-color: #fafafa;
`

const nav = css`
  background-color: white
`

const header = css`
  display: flex;
  border-bottom: 1px solid rbga(0,0,0,0.075);
  paddingL 20px 30px;
`
  
const description = css`
  margin: 0;
  color: #999999;
`

const titleContainer = css`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`

const title = css`
  margin-left: 30px;
  font-weight: 500;
  margin: 0;
`

const buttonContainer = css`
  width: 100%;
  display: flex;
  flex: 1;
  justify-contnent: flex-end;
`

const buttonStyle = css`
  background-color: #fafafa;
  outline: none;
  border: none;
  font-size: 18px;
  padding: 16px 70px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 7px 7px rgba(0, 0, 0, 0.1);
`

const link = css`
  margin: 0 40px 0 0;
  font-size: 18px;
  font-weight: 400;
`

export default MyApp