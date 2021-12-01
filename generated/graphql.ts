import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type AssetPair = {
  __typename?: 'AssetPair';
  blockNumber: Scalars['BigInt'];
  currentPrice: Scalars['BigInt'];
  decimals: Scalars['Int'];
  hourRoundId: Scalars['Int'];
  hourlyHistory: Array<HourlyPriceHistory>;
  id: Scalars['ID'];
  roundId: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};


export type AssetPairHourlyHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<HourlyPriceHistory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<HourlyPriceHistory_Filter>;
};

export type AssetPair_Filter = {
  blockNumber?: Maybe<Scalars['BigInt']>;
  blockNumber_gt?: Maybe<Scalars['BigInt']>;
  blockNumber_gte?: Maybe<Scalars['BigInt']>;
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: Maybe<Scalars['BigInt']>;
  blockNumber_lte?: Maybe<Scalars['BigInt']>;
  blockNumber_not?: Maybe<Scalars['BigInt']>;
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentPrice?: Maybe<Scalars['BigInt']>;
  currentPrice_gt?: Maybe<Scalars['BigInt']>;
  currentPrice_gte?: Maybe<Scalars['BigInt']>;
  currentPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  currentPrice_lt?: Maybe<Scalars['BigInt']>;
  currentPrice_lte?: Maybe<Scalars['BigInt']>;
  currentPrice_not?: Maybe<Scalars['BigInt']>;
  currentPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  decimals?: Maybe<Scalars['Int']>;
  decimals_gt?: Maybe<Scalars['Int']>;
  decimals_gte?: Maybe<Scalars['Int']>;
  decimals_in?: Maybe<Array<Scalars['Int']>>;
  decimals_lt?: Maybe<Scalars['Int']>;
  decimals_lte?: Maybe<Scalars['Int']>;
  decimals_not?: Maybe<Scalars['Int']>;
  decimals_not_in?: Maybe<Array<Scalars['Int']>>;
  hourRoundId?: Maybe<Scalars['Int']>;
  hourRoundId_gt?: Maybe<Scalars['Int']>;
  hourRoundId_gte?: Maybe<Scalars['Int']>;
  hourRoundId_in?: Maybe<Array<Scalars['Int']>>;
  hourRoundId_lt?: Maybe<Scalars['Int']>;
  hourRoundId_lte?: Maybe<Scalars['Int']>;
  hourRoundId_not?: Maybe<Scalars['Int']>;
  hourRoundId_not_in?: Maybe<Array<Scalars['Int']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  roundId?: Maybe<Scalars['BigInt']>;
  roundId_gt?: Maybe<Scalars['BigInt']>;
  roundId_gte?: Maybe<Scalars['BigInt']>;
  roundId_in?: Maybe<Array<Scalars['BigInt']>>;
  roundId_lt?: Maybe<Scalars['BigInt']>;
  roundId_lte?: Maybe<Scalars['BigInt']>;
  roundId_not?: Maybe<Scalars['BigInt']>;
  roundId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum AssetPair_OrderBy {
  BlockNumber = 'blockNumber',
  CurrentPrice = 'currentPrice',
  Decimals = 'decimals',
  HourRoundId = 'hourRoundId',
  HourlyHistory = 'hourlyHistory',
  Id = 'id',
  RoundId = 'roundId',
  Timestamp = 'timestamp'
}

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
  number_gte?: Maybe<Scalars['Int']>;
};

export type HourlyPriceHistory = {
  __typename?: 'HourlyPriceHistory';
  assetPair: AssetPair;
  closingPrice: Scalars['BigInt'];
  decimals: Scalars['Int'];
  highPrice: Scalars['BigInt'];
  hourStamp: Scalars['BigInt'];
  id: Scalars['ID'];
  lowPrice: Scalars['BigInt'];
  openingPrice: Scalars['BigInt'];
  test?: Maybe<Scalars['String']>;
  timestamp: Scalars['BigInt'];
};

export type HourlyPriceHistory_Filter = {
  assetPair?: Maybe<Scalars['String']>;
  assetPair_contains?: Maybe<Scalars['String']>;
  assetPair_ends_with?: Maybe<Scalars['String']>;
  assetPair_gt?: Maybe<Scalars['String']>;
  assetPair_gte?: Maybe<Scalars['String']>;
  assetPair_in?: Maybe<Array<Scalars['String']>>;
  assetPair_lt?: Maybe<Scalars['String']>;
  assetPair_lte?: Maybe<Scalars['String']>;
  assetPair_not?: Maybe<Scalars['String']>;
  assetPair_not_contains?: Maybe<Scalars['String']>;
  assetPair_not_ends_with?: Maybe<Scalars['String']>;
  assetPair_not_in?: Maybe<Array<Scalars['String']>>;
  assetPair_not_starts_with?: Maybe<Scalars['String']>;
  assetPair_starts_with?: Maybe<Scalars['String']>;
  closingPrice?: Maybe<Scalars['BigInt']>;
  closingPrice_gt?: Maybe<Scalars['BigInt']>;
  closingPrice_gte?: Maybe<Scalars['BigInt']>;
  closingPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  closingPrice_lt?: Maybe<Scalars['BigInt']>;
  closingPrice_lte?: Maybe<Scalars['BigInt']>;
  closingPrice_not?: Maybe<Scalars['BigInt']>;
  closingPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  decimals?: Maybe<Scalars['Int']>;
  decimals_gt?: Maybe<Scalars['Int']>;
  decimals_gte?: Maybe<Scalars['Int']>;
  decimals_in?: Maybe<Array<Scalars['Int']>>;
  decimals_lt?: Maybe<Scalars['Int']>;
  decimals_lte?: Maybe<Scalars['Int']>;
  decimals_not?: Maybe<Scalars['Int']>;
  decimals_not_in?: Maybe<Array<Scalars['Int']>>;
  highPrice?: Maybe<Scalars['BigInt']>;
  highPrice_gt?: Maybe<Scalars['BigInt']>;
  highPrice_gte?: Maybe<Scalars['BigInt']>;
  highPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  highPrice_lt?: Maybe<Scalars['BigInt']>;
  highPrice_lte?: Maybe<Scalars['BigInt']>;
  highPrice_not?: Maybe<Scalars['BigInt']>;
  highPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  hourStamp?: Maybe<Scalars['BigInt']>;
  hourStamp_gt?: Maybe<Scalars['BigInt']>;
  hourStamp_gte?: Maybe<Scalars['BigInt']>;
  hourStamp_in?: Maybe<Array<Scalars['BigInt']>>;
  hourStamp_lt?: Maybe<Scalars['BigInt']>;
  hourStamp_lte?: Maybe<Scalars['BigInt']>;
  hourStamp_not?: Maybe<Scalars['BigInt']>;
  hourStamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lowPrice?: Maybe<Scalars['BigInt']>;
  lowPrice_gt?: Maybe<Scalars['BigInt']>;
  lowPrice_gte?: Maybe<Scalars['BigInt']>;
  lowPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  lowPrice_lt?: Maybe<Scalars['BigInt']>;
  lowPrice_lte?: Maybe<Scalars['BigInt']>;
  lowPrice_not?: Maybe<Scalars['BigInt']>;
  lowPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  openingPrice?: Maybe<Scalars['BigInt']>;
  openingPrice_gt?: Maybe<Scalars['BigInt']>;
  openingPrice_gte?: Maybe<Scalars['BigInt']>;
  openingPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  openingPrice_lt?: Maybe<Scalars['BigInt']>;
  openingPrice_lte?: Maybe<Scalars['BigInt']>;
  openingPrice_not?: Maybe<Scalars['BigInt']>;
  openingPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  test?: Maybe<Scalars['String']>;
  test_contains?: Maybe<Scalars['String']>;
  test_ends_with?: Maybe<Scalars['String']>;
  test_gt?: Maybe<Scalars['String']>;
  test_gte?: Maybe<Scalars['String']>;
  test_in?: Maybe<Array<Scalars['String']>>;
  test_lt?: Maybe<Scalars['String']>;
  test_lte?: Maybe<Scalars['String']>;
  test_not?: Maybe<Scalars['String']>;
  test_not_contains?: Maybe<Scalars['String']>;
  test_not_ends_with?: Maybe<Scalars['String']>;
  test_not_in?: Maybe<Array<Scalars['String']>>;
  test_not_starts_with?: Maybe<Scalars['String']>;
  test_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum HourlyPriceHistory_OrderBy {
  AssetPair = 'assetPair',
  ClosingPrice = 'closingPrice',
  Decimals = 'decimals',
  HighPrice = 'highPrice',
  HourStamp = 'hourStamp',
  Id = 'id',
  LowPrice = 'lowPrice',
  OpeningPrice = 'openingPrice',
  Test = 'test',
  Timestamp = 'timestamp'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  assetPair?: Maybe<AssetPair>;
  assetPairs: Array<AssetPair>;
  hourlyPriceHistories: Array<HourlyPriceHistory>;
  hourlyPriceHistory?: Maybe<HourlyPriceHistory>;
};


export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type QueryAssetPairArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAssetPairsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetPair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<AssetPair_Filter>;
};


export type QueryHourlyPriceHistoriesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<HourlyPriceHistory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<HourlyPriceHistory_Filter>;
};


export type QueryHourlyPriceHistoryArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  assetPair?: Maybe<AssetPair>;
  assetPairs: Array<AssetPair>;
  hourlyPriceHistories: Array<HourlyPriceHistory>;
  hourlyPriceHistory?: Maybe<HourlyPriceHistory>;
};


export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type SubscriptionAssetPairArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAssetPairsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetPair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<AssetPair_Filter>;
};


export type SubscriptionHourlyPriceHistoriesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<HourlyPriceHistory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<HourlyPriceHistory_Filter>;
};


export type SubscriptionHourlyPriceHistoryArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetAssetPairsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssetPairsQuery = { __typename?: 'Query', assetPairs: Array<{ __typename?: 'AssetPair', id: string, currentPrice: any, decimals: number, roundId: any, hourRoundId: number, timestamp: any, hourlyHistory: Array<{ __typename?: 'HourlyPriceHistory', hourStamp: any, id: string, openingPrice: any, closingPrice: any, lowPrice: any, highPrice: any, timestamp: any }> }> };

export type SubscribeAssetPairsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeAssetPairsSubscription = { __typename?: 'Subscription', assetPairs: Array<{ __typename?: 'AssetPair', id: string, currentPrice: any, decimals: number, roundId: any, hourRoundId: number, timestamp: any, hourlyHistory: Array<{ __typename?: 'HourlyPriceHistory', hourStamp: any, id: string, openingPrice: any, closingPrice: any, lowPrice: any, highPrice: any, timestamp: any }> }> };


export const GetAssetPairsDocument = gql`
    query GetAssetPairs {
  assetPairs {
    id
    currentPrice
    decimals
    roundId
    hourRoundId
    timestamp
    hourlyHistory(first: 3, orderBy: hourStamp, orderDirection: asc) {
      hourStamp
      id
      openingPrice
      closingPrice
      lowPrice
      highPrice
      timestamp
    }
  }
}
    `;

export function useGetAssetPairsQuery(options: Omit<Urql.UseQueryArgs<GetAssetPairsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAssetPairsQuery>({ query: GetAssetPairsDocument, ...options });
};
export const SubscribeAssetPairsDocument = gql`
    subscription SubscribeAssetPairs {
  assetPairs {
    id
    currentPrice
    decimals
    roundId
    hourRoundId
    timestamp
    hourlyHistory(orderBy: hourStamp, orderDirection: asc) {
      hourStamp
      id
      openingPrice
      closingPrice
      lowPrice
      highPrice
      timestamp
    }
  }
}
    `;

export function useSubscribeAssetPairsSubscription<TData = SubscribeAssetPairsSubscription>(options: Omit<Urql.UseSubscriptionArgs<SubscribeAssetPairsSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<SubscribeAssetPairsSubscription, TData>) {
  return Urql.useSubscription<SubscribeAssetPairsSubscription, TData, SubscribeAssetPairsSubscriptionVariables>({ query: SubscribeAssetPairsDocument, ...options }, handler);
};
import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": null,
    "subscriptionType": {
      "name": "Subscription"
    },
    "types": [
      {
        "kind": "OBJECT",
        "name": "AssetPair",
        "fields": [
          {
            "name": "blockNumber",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "currentPrice",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "decimals",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "hourRoundId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "hourlyHistory",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "HourlyPriceHistory",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "roundId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "HourlyPriceHistory",
        "fields": [
          {
            "name": "assetPair",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AssetPair",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "closingPrice",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "decimals",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "highPrice",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "hourStamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "lowPrice",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "openingPrice",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "test",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "_meta",
            "type": {
              "kind": "OBJECT",
              "name": "_Meta_",
              "ofType": null
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "assetPair",
            "type": {
              "kind": "OBJECT",
              "name": "AssetPair",
              "ofType": null
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "assetPairs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AssetPair",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "hourlyPriceHistories",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "HourlyPriceHistory",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "hourlyPriceHistory",
            "type": {
              "kind": "OBJECT",
              "name": "HourlyPriceHistory",
              "ofType": null
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Subscription",
        "fields": [
          {
            "name": "_meta",
            "type": {
              "kind": "OBJECT",
              "name": "_Meta_",
              "ofType": null
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "assetPair",
            "type": {
              "kind": "OBJECT",
              "name": "AssetPair",
              "ofType": null
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "assetPairs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AssetPair",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "hourlyPriceHistories",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "HourlyPriceHistory",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "hourlyPriceHistory",
            "type": {
              "kind": "OBJECT",
              "name": "HourlyPriceHistory",
              "ofType": null
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "_Block_",
        "fields": [
          {
            "name": "hash",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "number",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "_Meta_",
        "fields": [
          {
            "name": "block",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "_Block_",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deployment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "hasIndexingErrors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;