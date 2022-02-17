import { juiceDecimals } from "@vanilladefi/core-sdk";
import { ethers } from "ethers";
import { VanillaEvents } from '../state';
import tokens from "../tokens";

// RFC 2822 email spec
export const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const isValidEmail = (email?: string) =>
  !!email && EMAIL_REGEX.test(email);

export const formatJuice = (amount: ethers.BigNumberish) =>
  Number(ethers.utils.formatUnits(amount, juiceDecimals)).toFixed(3);

export const parseJuice = (amount: string | number) =>
  ethers.utils.parseUnits(amount.toString(), juiceDecimals);

export const findToken = (nameOrId: string): typeof tokens[0] | undefined => {
  const id = nameOrId.split('/')[0].trim()
  return tokens.find(token => token.id === id || token.alias === id)
}

export const emitEvent = (eventType: VanillaEvents) => {
  const event = new Event(eventType)
  window.dispatchEvent(event)
}