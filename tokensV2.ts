const tokens = [
  {
    "id": "1INCH",
    "decimals": 8,
    "address": "0x443C5116CdF663Eb387e72C688D276e702135C87",
    "imageUrl": "1INCH.png",
    "name": "1inch"
  },
  {
    "id": "AAPL",
    "decimals": 8,
    "address": "0x7E7B45b08F68EC69A99AAb12e42FcCB078e10094",
    "imageUrl": null,
    "name": "Apple Inc"
  },
  {
    "id": "AAVE",
    "decimals": 8,
    "address": "0x72484B12719E23115761D5DA1646945632979bB6",
    "imageUrl": "AAVE.png",
    "name": "Aave"
  },
  {
    "id": "ADA",
    "decimals": 8,
    "address": "0x882554df528115a743c4537828DA8D5B58e52544",
    "imageUrl": "ADA.png",
    "name": "Cardano"
  },
  {
    "id": "AED",
    "decimals": 8,
    "address": "0x3fd911749Fce21a38704B76FFaBcB6BeF2567F2E",
    "name": 'Arab Emirates Dirham',
    "imageUrl": null
  },
  {
    "id": "ALCX",
    "decimals": 8,
    "address": "0x5DB6e61B6159B20F068dc15A47dF2E5931b14f29",
    "imageUrl": "ALCX.png",
    "name": "Alchemix"
  },
  {
    "id": "ALGO",
    "decimals": 8,
    "address": "0x03Bc6D9EFed65708D35fDaEfb25E87631a0a3437",
    "imageUrl": "ALGO.png",
    "name": "Algorand"
  },
  {
    "id": "AMZN",
    "decimals": 8,
    "address": "0xf9184b8E5da48C19fA4E06f83f77742e748cca96",
    "name": "Amazon.com, Inc.",
    "imageUrl": null
  },
  {
    "id": "AUD",
    "decimals": 8,
    "address": "0x062Df9C4efd2030e243ffCc398b652e8b8F95C6f",
    "name": "Australian Dollar",
    "imageUrl": null
  },
  {
    "id": "BADGER",
    "decimals": 8,
    "address": "0xF626964Ba5e81405f47e8004F0b276Bb974742B5",
    "imageUrl": "BADGER.png",
    "name": "Badger DAO"
  },
  {
    "id": "BAL",
    "decimals": 8,
    "address": "0xD106B538F2A868c28Ca1Ec7E298C3325E0251d66",
    "imageUrl": "BAL.png",
    "name": "Balancer"
  },
  {
    "id": "BAT",
    "decimals": 8,
    "address": "0x2346Ce62bd732c62618944E51cbFa09D985d86D2",
    "imageUrl": "BAT.png",
    "name": "Basic Attention Token"
  },
  {
    "id": "BCH",
    "decimals": 8,
    "address": "0x327d9822e9932996f55b39F557AEC838313da8b7",
    "imageUrl": "BCH.png",
    "name": "Bitcoin Cash"
  },
  {
    "id": "BHD",
    "decimals": 8,
    "address": "0xC5c770ae2efDF0DBC2FB366fb3833dAc2A20BF2F",
    "imageUrl": "BHD.png",
    "name": "Bitcoin HD"
  },
  {
    "id": "BNB",
    "decimals": 8,
    "address": "0x82a6c4AF830caa6c97bb504425f6A66165C2c26e",
    "imageUrl": "BNB.png",
    "name": "Binance Coin"
  },
  {
    "id": "BNT",
    "decimals": 8,
    "address": "0xF5724884b6E99257cC003375e6b844bC776183f9",
    "imageUrl": "BNT.png",
    "name": "Bancor Network Token"
  },
  {
    "id": "BOND",
    "decimals": 8,
    "address": "0x58527C2dCC755297bB81f9334b80b2B6032d8524",
    "imageUrl": "BOND.png",
    "name": "BarnBridge"
  },
  {
    "id": "BSV",
    "decimals": 8,
    "address": "0x8803DD6705F0d38e79790B02A2C43594A0538D22",
    "imageUrl": "BSV.png",
    "name": "Bitcoin SV"
  },
  {
    "id": "BTC",
    "decimals": 8,
    "address": "0xc907E116054Ad103354f2D350FD2514433D57F6f",
    "imageUrl": "BTC.png",
    "name": "Bitcoin"
  },
  {
    "id": "BTG",
    "decimals": 8,
    "address": "0x2f2C605F28DE314bc579a7c0FDf85536529E9825",
    "imageUrl": "BTG.png",
    "name": "Bitcoin Gold"
  },
  {
    "id": "BUSD",
    "decimals": 8,
    "address": "0xE0dC07D5ED74741CeeDA61284eE56a2A0f7A4Cc9",
    "imageUrl": "BUSD.png",
    "name": "Binance USD"
  },
  {
    "id": "BZRX",
    "decimals": 8,
    "address": "0x6b7D436583e5fE0874B7310b74D29A13af816860",
    "imageUrl": "BZRX.png",
    "name": "bZx Protocol"
  },
  {
    "id": "CAD",
    "decimals": 8,
    "address": "0xACA44ABb8B04D07D883202F99FA5E3c53ed57Fb5",
    "imageUrl": "CAD.png",
    "name": "Candy Protocol"
  },
  {
    "id": "CEL",
    "decimals": 8,
    "address": "0xc9ECF45956f576681bDc01F79602A79bC2667B0c",
    "imageUrl": "CEL.png",
    "name": "Celsius Network"
  },
  {
    "id": "CHF",
    "decimals": 8,
    "address": "0xc76f762CedF0F78a439727861628E0fdfE1e70c2",
    "name": "Swiss Franc",
    "imageUrl": null
  },
  {
    "id": "CLP",
    "decimals": 8,
    "address": "0xf238A5fB3A15aB4b063B3894Fab30442620b70B9",
    "name": "Chilean Peso",
    "imageUrl": null
  },
  {
    "id": "COMP",
    "decimals": 8,
    "address": "0x2A8758b7257102461BC958279054e372C2b1bDE6",
    "imageUrl": "COMP.png",
    "name": "Compound Coin"
  },
  {
    "id": "COP",
    "decimals": 8,
    "address": "0xDe6302Dfa0ac45B2B1b1a23304469DA630b2F59B",
    "imageUrl": "COP.png",
    "name": "Copiosa"
  },
  {
    "id": "CRV",
    "decimals": 8,
    "address": "0x336584C8E6Dc19637A5b36206B1c79923111b405",
    "imageUrl": "CRV.png",
    "name": "Curve DAO Token"
  },
  {
    "id": "CTX",
    "decimals": 8,
    "address": "0xE039D4aA72A0C0d6d0218E650c1eBD6B2675A575",
    "imageUrl": "CTX.png",
    "name": "Cryptex Finance"
  },
  {
    "id": "DAI",
    "decimals": 8,
    "address": "0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D",
    "imageUrl": "DAI.png",
    "name": "Dai"
  },
  {
    "id": "DASH",
    "decimals": 8,
    "address": "0xD94427eDee70E4991b4b8DdCc848f2B58ED01C0b",
    "imageUrl": "DASH.png",
    "name": "Dash"
  },
  {
    "id": "DODO",
    "decimals": 8,
    "address": "0x59161117086a4C7A9beDA16C66e40Bdaa1C5a8B6",
    "imageUrl": "DODO.png",
    "name": "DODO"
  },
  {
    "id": "DOGE",
    "decimals": 8,
    "address": "0xbaf9327b6564454F4a3364C33eFeEf032b4b4444",
    "imageUrl": "DOGE.png",
    "name": "Dogecoin"
  },
  {
    "id": "DOT",
    "decimals": 8,
    "address": "0xacb51F1a83922632ca02B25a8164c10748001BdE",
    "imageUrl": "DOT.png",
    "name": "Polkadot"
  },
  {
    "id": "DPI",
    "decimals": 8,
    "address": "0x2e48b7924FBe04d575BA229A59b64547d9da16e9",
    "imageUrl": "DPI.png",
    "name": "DeFiPulse Index"
  },
  {
    "id": "EOS",
    "decimals": 8,
    "address": "0xd6285F06203D938ab713Fa6A315e7d23247DDE95",
    "imageUrl": "EOS.png",
    "name": "EOS"
  },
  {
    "id": "ETC",
    "decimals": 8,
    "address": "0xDf3f72Be10d194b58B1BB56f2c4183e661cB2114",
    "imageUrl": "ETC.png",
    "name": "Ethereum Classic"
  },
  {
    "id": "ETH",
    "decimals": 8,
    "address": "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    "imageUrl": "ETH.png",
    "name": "Ethereum"
  },
  {
    "id": "EUR",
    "decimals": 8,
    "address": "0x73366Fe0AA0Ded304479862808e02506FE556a98",
    "name": "Euro",
    "imageUrl": null
  },
  {
    "id": "FARM",
    "decimals": 8,
    "address": "0xDFb138ba3A6CCe675A6F5961323Be31eE42E40ff",
    "imageUrl": "FARM.png",
    "name": "Harvest Finance"
  },
  {
    "id": "FB",
    "decimals": 8,
    "address": "0x5b4586C911144A947D7814Fd71fe0872b8334748",
    "imageUrl": null,
    "name": "Facebook"
  },
  {
    "id": "FXS",
    "decimals": 8,
    "address": "0x6C0fe985D3cAcbCdE428b84fc9431792694d0f51",
    "imageUrl": "FXS.png",
    "name": "Frax Share"
  },
  {
    "id": "GBP",
    "decimals": 8,
    "address": "0x099a2540848573e94fb1Ca0Fa420b00acbBc845a",
    "name": "Pound sterling",
    "imageUrl": null
  },
  {
    "id": "GHST",
    "decimals": 8,
    "address": "0xDD229Ce42f11D8Ee7fFf29bDB71C7b81352e11be",
    "imageUrl": "GHST.png",
    "name": "Aavegotchi"
  },
  {
    "id": "GOOGL",
    "decimals": 8,
    "address": "0x1b32682C033b2DD7EFdC615FA82d353e254F39b5",
    "name": "Alphabet Inc",
    "imageUrl": null
  },
  {
    "id": "HBAR",
    "decimals": 8,
    "address": "0xC5878bDf8a89FA3bF0DC8389ae8EE6DE601D01bC",
    "imageUrl": "HBAR.png",
    "name": "Hedera"
  },
  {
    "id": "HKD",
    "decimals": 8,
    "address": "0x82d43B72573f902F960126a19581BcBbA5b014F5",
    "name": "Hong Kong Dollar",
    "imageUrl": null
  },
  {
    "id": "HT",
    "decimals": 8,
    "address": "0x6F8F9e75C0285AecE30ADFe1BCc1955f145d971A",
    "imageUrl": "HT.png",
    "name": "Huobi Token"
  },
  {
    "id": "ICP",
    "decimals": 8,
    "address": "0x84227A76a04289473057BEF706646199D7C58c34",
    "imageUrl": "ICP.png",
    "name": "Internet Computer"
  },
  {
    "id": "ILS",
    "decimals": 8,
    "address": "0x8d5eB34C509261533235b91350d359EdcB969D33",
    "name": "Israeli New Shekel",
    "imageUrl": null
  },
  {
    "id": "JPY",
    "decimals": 8,
    "address": "0xD647a6fC9BC6402301583C91decC5989d8Bc382D",
    "name": "Japanese Yen",
    "imageUrl": null
  },
  {
    "id": "KNC",
    "decimals": 8,
    "address": "0x10e5f3DFc81B3e5Ef4e648C4454D04e79E1E41E2",
    "imageUrl": "KNC.png",
    "name": "Kyber Network Crystal"
  },
  {
    "id": "KWD",
    "decimals": 8,
    "address": "0x90711d545915f8e99a22BB1F86eb8C0403e3358F",
    "name": "Kuwaiti Dinar",
    "imageUrl": null
  },
  {
    "id": "LINK",
    "decimals": 8,
    "address": "0xd9FFdb71EbE7496cC440152d43986Aae0AB76665",
    "imageUrl": "LINK.png",
    "name": "Chainlink"
  },
  {
    "id": "LPT",
    "decimals": 8,
    "address": "0xBAaF11CeDA1d1Ca9Cf01748F8196653c9656a400",
    "imageUrl": "LPT.png",
    "name": "Livepeer"
  },
  {
    "id": "LTC",
    "decimals": 8,
    "address": "0xEB99F173cf7d9a6dC4D889C2Ad7103e8383b6Efa",
    "imageUrl": "LTC.png",
    "name": "Litecoin"
  },
  {
    "id": "LUNA",
    "decimals": 8,
    "address": "0x1248573D9B62AC86a3ca02aBC6Abe6d403Cd1034",
    "imageUrl": "LUNA.png",
    "name": "Terra"
  },
  {
    "id": "MANA",
    "decimals": 8,
    "address": "0xA1CbF3Fe43BC3501e3Fc4b573e822c70e76A7512",
    "imageUrl": "MANA.png",
    "name": "Decentraland"
  },
  {
    "id": "MATIC",
    "decimals": 8,
    "address": "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
    "imageUrl": "MATIC.png",
    "name": "Polygon"
  },
  {
    "id": "MFT",
    "decimals": 8,
    "address": "0x6E53C1c22427258BE55aE985a65c0C87BB631F9C",
    "imageUrl": "MFT.png",
    "name": "Hifi Finance"
  },
  {
    "id": "MIM",
    "decimals": 8,
    "address": "0xd133F916e04ed5D67b231183d85Be12eAA018320",
    "imageUrl": "MIM.png",
    "name": "Magic Internet Money"
  },
  {
    "id": "MIOTA",
    "decimals": 8,
    "address": "0x7d620D05c317A426903596432A5ca83375dC8d2A",
    "imageUrl": "MIOTA.png",
    "name": "IOTA"
  },
  {
    "id": "MKR",
    "decimals": 8,
    "address": "0xa070427bF5bA5709f70e98b94Cb2F435a242C46C",
    "imageUrl": "MKR.png",
    "name": "Maker"
  },
  {
    "id": "MSFT",
    "decimals": 8,
    "address": "0xC43081d9EA6d1c53f1F0e525504d47Dd60de12da",
    "name": "Microsoft Corporation",
    "imageUrl": null
  },
  {
    "id": "MXN",
    "decimals": 8,
    "address": "0x171b16562EA3476F5C61d1b8dad031DbA0768545",
    "name": "Mexican Peso",
    "imageUrl": null
  },
  {
    "id": "NEO",
    "decimals": 8,
    "address": "0x74b3587A23eE786A43C8529c2e98D3C05a8fb1fB",
    "imageUrl": "NEO.png",
    "name": "NEO"
  },
  {
    "id": "NZD",
    "decimals": 8,
    "address": "0xa302a0B8a499fD0f00449df0a490DedE21105955",
    "name": "New Zealand Dollar",
    "imageUrl": null
  },
  {
    "id": "OHM",
    "decimals": 8,
    "address": "0xa8B05B6337040c0529919BDB51f6B40A684eb08C",
    "imageUrl": "OHM.png",
    "name": "Olympus"
  },
  {
    "id": "OMG",
    "decimals": 8,
    "address": "0x93FfEE768F74208a7b9f2a4426f0F6BCbb1D09de",
    "imageUrl": "OMG.png",
    "name": "OMG Network"
  },
  {
    "id": "OMR",
    "decimals": 8,
    "address": "0x0E12b79A6E5c919F89246edEdb2d6413a8890a54",
    "name": "Omani Rial",
    "imageUrl": null
  },
  {
    "id": "PAX",
    "decimals": 8,
    "address": "0x56D55D34EcC616e71ae998aCcba79F236ff2ff46",
    "imageUrl": "PAX.png",
    "name": "Paxos Dollar (USDP)"
  },
  {
    "id": "PAXG",
    "decimals": 8,
    "address": "0x0f6914d8e7e1214CDb3A4C6fbf729b75C69DF608",
    "imageUrl": "PAXG.png",
    "name": "PAX Gold"
  },
  {
    "id": "PHP",
    "decimals": 8,
    "address": "0x218231089Bebb2A31970c3b77E96eCfb3BA006D1",
    "name": "Philippine peso",
    "imageUrl": null
  },
  {
    "id": "QUICK",
    "decimals": 8,
    "address": "0xa058689f4bCa95208bba3F265674AE95dED75B6D",
    "imageUrl": "QUICK.png",
    "name": "Quickswap"
  },
  {
    "id": "RAI",
    "decimals": 8,
    "address": "0x7f45273fD7C644714825345670414Ea649b50b16",
    "imageUrl": "RAI.png",
    "name": "Rai Reflex Index"
  },
  {
    "id": "REP",
    "decimals": 8,
    "address": "0x634b084372f88848aC8F8006DC178aA810A58E89",
    "imageUrl": "REP.png",
    "name": "Augur"
  },
  {
    "id": "SAND",
    "decimals": 8,
    "address": "0x3D49406EDd4D52Fb7FFd25485f32E073b529C924",
    "imageUrl": "SAND.png",
    "name": "The Sandbox"
  },
  {
    "id": "SAR",
    "decimals": 8,
    "address": "0x5047CdCf17AA5a0bb77217497142657B27a1e228",
    "imageUrl": "SAR.png",
    "name": "Saren"
  },
  {
    "id": "SGD",
    "decimals": 8,
    "address": "0x8CE3cAc0E6635ce04783709ca3CC4F5fc5304299",
    "name": "Singapore Dollar",
    "imageUrl": null
  },
  {
    "id": "SNX",
    "decimals": 8,
    "address": "0xbF90A5D9B6EE9019028dbFc2a9E50056d5252894",
    "imageUrl": "SNX.png",
    "name": "Synthetix Network Token"
  },
  {
    "id": "SOL",
    "decimals": 8,
    "address": "0x10C8264C0935b3B9870013e057f330Ff3e9C56dC",
    "imageUrl": "SOL.png",
    "name": "Solana"
  },
  {
    "id": "SUSHI",
    "decimals": 8,
    "address": "0x49B0c695039243BBfEb8EcD054EB70061fd54aa0",
    "imageUrl": "SUSHI.png",
    "name": "Sushi"
  },
  {
    "id": "THETA",
    "decimals": 8,
    "address": "0x38611b09F8f2D520c14eA973765C225Bf57B9Eac",
    "imageUrl": "THETA.png",
    "name": "Theta Network"
  },
  {
    "id": "TRX",
    "decimals": 8,
    "address": "0x307cCF7cBD17b69A487b9C3dbe483931Cf3E1833",
    "imageUrl": "TRX.png",
    "name": "TRON"
  },
  {
    "id": "TRY",
    "decimals": 8,
    "address": "0xd78325DcA0F90F0FFe53cCeA1B02Bb12E1bf8FdB",
    "imageUrl": "TRY.png",
    "name": "Try.Finance"
  },
  {
    "id": "TSLA",
    "decimals": 8,
    "address": "0x567E67f456c7453c583B6eFA6F18452cDee1F5a8",
    "imageUrl": null,
    "name": "Tesla"
  },
  {
    "id": "TUSD",
    "decimals": 8,
    "address": "0x7C5D415B64312D38c56B54358449d0a4058339d2",
    "imageUrl": "TUSD.png",
    "name": "TrueUSD"
  },
  {
    "id": "UMA",
    "decimals": 8,
    "address": "0x33D9B1BAaDcF4b26ab6F8E83e9cb8a611B2B3956",
    "imageUrl": "UMA.png",
    "name": "UMA"
  },
  {
    "id": "UNI",
    "decimals": 8,
    "address": "0xdf0Fb4e4F928d2dCB76f438575fDD8682386e13C",
    "imageUrl": "UNI.png",
    "name": "UNICORN Token"
  },
  {
    "id": "USDC",
    "decimals": 8,
    "address": "0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7",
    "imageUrl": "USDC.png",
    "name": "USD Coin"
  },
  {
    "id": "USDT",
    "decimals": 8,
    "address": "0x0A6513e40db6EB1b165753AD52E80663aeA50545",
    "imageUrl": "USDT.png",
    "name": "Tether"
  },
  {
    "id": "VET",
    "decimals": 8,
    "address": "0xD78bc11ef3256e3CE9dC0DF0fa7be9E9afc07f95",
    "imageUrl": "VET.png",
    "name": "VeChain"
  },
  {
    "id": "WBTC",
    "decimals": 8,
    "address": "0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6",
    "imageUrl": "WBTC.png",
    "name": "Wrapped Bitcoin"
  },
  {
    "id": "XAG",
    "decimals": 8,
    "address": "0x461c7B8D370a240DdB46B402748381C3210136b3",
    "imageUrl": "XAG.png",
    "name": "Xrpalike Gene"
  },
  {
    "id": "XAU",
    "decimals": 8,
    "address": "0x0C466540B2ee1a31b441671eac0ca886e051E410",
    "name": "Gold Spot",
    "imageUrl": null
  },
  {
    "id": "XLM",
    "decimals": 8,
    "address": "0x692AE5510cA9070095A496dbcFBCDA99D4024Cd9",
    "imageUrl": "XLM.png",
    "name": "Stellar"
  },
  {
    "id": "XMR",
    "decimals": 8,
    "address": "0xBE6FB0AB6302B693368D0E9001fAF77ecc6571db",
    "imageUrl": "XMR.png",
    "name": "Monero"
  },
  {
    "id": "XRP",
    "decimals": 8,
    "address": "0x785ba89291f676b5386652eB12b30cF361020694",
    "imageUrl": "XRP.png",
    "name": "XRP"
  },
  {
    "id": "XSUSHI",
    "decimals": 8,
    "address": "0xC16Cb62CddE46f43Fd73257b957Bf527f07b51C0",
    "imageUrl": "XSUSHI.png",
    "name": "xSUSHI"
  },
  {
    "id": "XTZ",
    "decimals": 8,
    "address": "0x691e26AB58ff05800E028b0876A41B720b26FC65",
    "imageUrl": "XTZ.png",
    "name": "Tezos"
  },
  {
    "id": "YFI",
    "decimals": 8,
    "address": "0x9d3A43c111E7b2C6601705D9fcF7a70c95b1dc55",
    "imageUrl": "YFI.png",
    "name": "yearn.finance"
  },
  {
    "id": "ZEC",
    "decimals": 8,
    "address": "0xBC08c639e579a391C4228F20d0C29d0690092DF0",
    "imageUrl": "ZEC.png",
    "name": "Zcash"
  },
  {
    "id": "ZRX",
    "decimals": 8,
    "address": "0x6EA4d89474d9410939d429B786208c74853A5B47",
    "imageUrl": "ZRX.png",
    "name": "0x"
  }
]

export default tokens;