import { connect } from 'mongoose';

export default async (url: string) => connect(url);