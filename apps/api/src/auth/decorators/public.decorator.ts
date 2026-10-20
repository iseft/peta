import { AuthStrategyEnum } from '../models/auth-strategy.enum';
import { SetAuthStrategy } from './set-auth-strategy.decorator';

export const Public = () => SetAuthStrategy(AuthStrategyEnum.NONE);
