import { Features } from './core.ts';
import { Service } from './state.ts';

type Config = {
  service: Service;
  growth: Features;
};

export type Remote<I, O> = (
  config: Config,
  input: I,
) => Promise<O>;
