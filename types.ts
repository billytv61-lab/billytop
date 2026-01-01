
export interface Withdrawal {
  id: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Approved' | 'Paid';
  method: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  isActivated: boolean;
  miningSpeed: number;
  miningLevel: number;
  totalMined: number;
  referralCount: number;
  dailyBonusLastClaimed?: number;
  withdrawals: Withdrawal[];
  achievements: string[];
}

export enum Page {
  HOME = 'home',
  DASHBOARD = 'dashboard',
  MINING = 'mining',
  ACTIVATION = 'activation',
  WITHDRAW = 'withdraw',
  REFERRALS = 'referrals',
  ABOUT = 'about',
  CONTACT = 'contact',
  LOGIN = 'login',
  REGISTER = 'register'
}

export interface MiningSession {
  active: boolean;
  startTime: number;
  expectedEarnings: number;
}
