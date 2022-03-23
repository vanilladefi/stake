import { isAddress } from "@vanilladefi/core-sdk";
import { getLeaderboard } from "@vanilladefi/stake-sdk";
import { BigNumber } from "ethers";
import type {
  ILeaderboard,
  JuicerColumn,
  LeaderboardRange,
} from "../components/Leaderboard";
import { state } from "../state";
import { formatJuice, getBlockByTimestamp } from "../utils/helpers";
import { juiceEpoch } from "./config";

export const getLeaderboardData = async (
  range: LeaderboardRange
): Promise<JuicerColumn[] | undefined> => {
  try {
    const optionalAddress = isAddress(
      process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
    );

    const provider = state.polygonProvider; // ?
    if (!provider) throw Error("Cannot access provider");

    const before7D = await getBlockByTimestamp(
      Date.now() - 7 * 24 * 60 * 60,
      provider
    );

    const before1D = await getBlockByTimestamp(
      Date.now() - 24 * 60 * 60,
      provider
    );

    const from =
      range === "weekly" ? before7D : range === "daily" ? before1D : juiceEpoch;

    const leaderboard = await getLeaderboard(from, "latest", 10, false, {
      signerOrProvider: provider,
      optionalAddress: optionalAddress || undefined,
      blockThreshold: Infinity,
    });

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
          juicer =
            (await state.ethereumProvider?.lookupAddress?.(user)) || user;
        } catch (error) {
          juicer = user;
        }

        return {
          juicer,
          juiceAmount: formatJuice(delta),
        };
      })
    );

    return data;
  } catch (error) {
    console.warn(error);
    return;
  }
};

export const fetchLeaderboard = async (): Promise<ILeaderboard> => {
  return {
    allTimeData: await getLeaderboardData("all-time"),
    weeklyData: await getLeaderboardData("weekly"),
    dailyData: await getLeaderboardData("daily"),
  };
};
