import { combineReducers } from '@reduxjs/toolkit';

import homeDataReducer from 'src/containers/Home/homeSildeData';
import kanBanDataReducer from 'src/containers/KanBanList/kanbanSildeData';

const rootReducer = combineReducers({
  homeData: homeDataReducer,
  kanBanData: kanBanDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
