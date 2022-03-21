import { epoch, isAddress } from '@vanilladefi/core-sdk';
import { getLeaderboard } from '@vanilladefi/stake-sdk';
import { BigNumber } from 'ethers';
import { state } from '../state';
import { formatJuice, getBlockByTimestamp } from './helpers';
import type { ILeaderboard, JuicerColumn } from '../components/Leaderboard';

export const getLeaderboardData = async (range: "all-time" | "weekly" | "daily"): Promise<JuicerColumn[] | undefined> => {
    try {
        const optionalAddress =
            isAddress(process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || "") || "";

        type LeaderBoard = [[string, BigNumber] | { user: string; delta: BigNumber }]; // TODO fix in sdk

        const provider = state.polygonProvider; // ?
        if (!provider) throw Error('Cannot access provider')

        const before7D = await getBlockByTimestamp(
            Date.now() - 7 * 24 * 60 * 60,
            provider
        );

        const before1D = await getBlockByTimestamp(
            Date.now() - 24 * 60 * 60,
            provider
        );

        const from =
            range === "weekly"
                ? before7D
                : range === "daily"
                    ? before1D
                    : epoch;

        const leaderboard = (await getLeaderboard(from, "latest", 10, {
            signerOrProvider: provider,
            optionalAddress,
        })) as unknown as LeaderBoard;

        const data = await Promise.all(
            leaderboard.map(async (val) => {
                let user: string;
                let delta: BigNumber;
                if (val instanceof Array) {
                    [user, delta] = val;
                } else {
                    ({ user, delta } = val);
                }

                let juicer: string;
                try {
                    juicer = (await state.ethereumProvider?.lookupAddress?.(user)) || user;
                } catch (error) {
                    juicer = user;
                }

                return {
                    juicer,
                    juiceAmount: formatJuice(delta),
                };
            })
        );

        return data
    } catch (error) {
        console.warn(error)
        return
    }
}

export const fetchLeaderboard = async (): Promise<ILeaderboard> => {
    console.log('fetching leaderboard data...')
    return {
        allTimeData: await getLeaderboardData('all-time'),
        weeklyData: await getLeaderboardData('weekly'),
        dailyData: await getLeaderboardData('daily')
    }
}