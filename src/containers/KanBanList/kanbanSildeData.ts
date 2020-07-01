import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { AppThunk } from 'redux/store';
import { RootState } from 'redux/rootReducer';
import { maxBy } from 'lodash';
// import { axiosInstance } from 'src/utils/fetchHelpers';
import { listKanBan } from 'src/containers/KanBanList/fakeData';
import { DropResult } from 'react-beautiful-dnd';

/* ----DEFINE_ACTION_REDUCER----*/

interface KanBanData {
  boardId?: number;
  listData: ListItem[];
}

const initialState: KanBanData = {
  boardId: undefined,
  listData: [],
};

const homeDataSlice = createSlice({
  name: 'kanBanList',
  initialState,
  reducers: {
    setKanBanData(state, action: PayloadAction<KanBanData>) {
      state.boardId = action.payload.boardId;
      state.listData = action.payload.listData;
    },
    updateListData(state, action: PayloadAction<DropResult>) {
      console.log('result', action.payload);
      const { destination, source, draggableId } = action.payload;
      if (destination && destination?.droppableId !== source.droppableId) {
        const listSourceIndex = state.listData.findIndex(item => {
          return item.id.toString() === source.droppableId;
        });
        const listDestIndex = state.listData.findIndex(item => {
          return item.id.toString() === destination?.droppableId;
        });

        if (listDestIndex === -1 || listSourceIndex === -1) return;
        const dragItem = state.listData[listSourceIndex].cards.find(
          item => item.id.toString() === draggableId.toString(),
        );
        if (!dragItem) return;
        const [removeItem] = state.listData[listSourceIndex].cards.splice(source.index, 1);
        state.listData[listDestIndex].cards.splice(destination?.index, 0, removeItem);
      }
    },
    createNewCard(state, action: PayloadAction<{ listId: number; title: string }>) {
      const findListToUpdate = state.listData.find(item => item.id === action.payload.listId);
      if (findListToUpdate) {
        findListToUpdate.cards.push({
          id: Math.random(),
          listId: action.payload.listId,
          title: action.payload.title,
          position: maxBy(findListToUpdate.cards, 'position')?.position || 0 + 1,
        });
      }
    },
    updateCard(state, action: PayloadAction<{ listId: number; cardItem: CardItem }>) {
      const { listId, cardItem } = action.payload;
      const findListToUpdateIndex = state.listData.findIndex(item => item.id === listId);
      if (findListToUpdateIndex > -1) {
        const cardUpdateIndex = state.listData[findListToUpdateIndex].cards.findIndex(card => card.id === cardItem.id);
        if (cardUpdateIndex > -1) {
          state.listData[findListToUpdateIndex].cards[cardUpdateIndex] = cardItem;
        }
      }
    },
  },
});

export const { setKanBanData, updateListData, createNewCard, updateCard } = homeDataSlice.actions;

export default homeDataSlice.reducer;

/* ----DEFINE_THUNK_FUNCTION----*/

export const fetchDataKanBanList = (): AppThunk => async dispatch => {
  try {
    // const data = await fetch(process.env.REACT_APP_BASE_URL + userName).then(response => response.json());
    // const { data } = await axiosInstance.get<UserGithub>(userName);

    dispatch(setKanBanData({ boardId: 1, listData: listKanBan }));
  } catch (e) {
    console.log('error', e);
  }
};

/* ----DEFINE_SELECTOR----*/

export const selectKanBanData = (state: RootState): KanBanData => state.kanBanData;

export const selectListData = createSelector(selectKanBanData, (kanBanData: KanBanData) => kanBanData.listData);
