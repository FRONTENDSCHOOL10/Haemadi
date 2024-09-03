import { EMOTIONS } from '@/constants';
import { oneOf } from 'prop-types';

export const emotionType = oneOf(EMOTIONS);
