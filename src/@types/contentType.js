import { CONTENTS } from '@/constants';
import { oneOf } from 'prop-types';

export const contentType = oneOf(CONTENTS);
