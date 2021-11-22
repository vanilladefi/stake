import { createClient, defaultExchanges, subscriptionExchange, Client } from 'urql';

import { SubscriptionClient } from 'subscriptions-transport-ws';



let client: Client;

// If we need subscriptions this is how to do it

// let wsClient: Client | undefined;
// if (typeof window !== 'undefined') {
//   wsClient = createWSClient({
//     url: 'ws://api.thegraph.com/subgraphs/id/QmZah3zzX8P6GAhFSgXJBs8cDrtXumLGXVutR9cmCEB4bJ',
//   });
// }

// if (typeof window !== 'undefined') {
//   const subscriptionClient = new SubscriptionClient('wss://api.thegraph.com/subgraphs/id/QmPF3iZqdKz4Nm7cSN9Rs8U2K8yJu8pKzuqRr8HtYWaF9u', { reconnect: true });
//   client = createClient({
//     url: 'https://api.thegraph.com/subgraphs/id/QmPF3iZqdKz4Nm7cSN9Rs8U2K8yJu8pKzuqRr8HtYWaF9u',
//     exchanges: [
//       ...defaultExchanges,
//       subscriptionExchange({
//         forwardSubscription: (operation) => subscriptionClient.request(operation)
//       }),
//     ],
//   });
// } else {
//   client = createClient({
//     url: 'https://api.thegraph.com/subgraphs/id/QmPF3iZqdKz4Nm7cSN9Rs8U2K8yJu8pKzuqRr8HtYWaF9u',
//   })
// }

client = createClient({
  url: 'https://api.thegraph.com/subgraphs/name/valstu/chainlink-polygon-price-feed',
});



export default client;