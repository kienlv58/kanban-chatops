import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { AppThunk } from 'redux/store';
import { RootState } from 'redux/rootReducer';
import moment from 'moment';
import { maxBy } from 'lodash';
// import { axiosInstance } from 'src/utils/fetchHelpers';
import { DropResult } from 'react-beautiful-dnd';

/* ----DEFINE_ACTION_REDUCER----*/

interface KanBanData {
  boardId?: number;
  listData: ColumnKanBan[];
  listLabel: LabelItem[];
}

const initialState: KanBanData = {
  boardId: undefined,
  listData: [],
  listLabel: [],
};

const homeDataSlice = createSlice({
  name: 'kanBanList',
  initialState,
  reducers: {
    setKanBanData(state, action: PayloadAction<{ boardId?: number; listData: ColumnKanBan[] }>) {
      state.boardId = action.payload.boardId;
      state.listData = action.payload.listData;
    },

    updateListData(state, action: PayloadAction<DropResult>) {
      console.log('result', action.payload);
      const { destination, source, draggableId } = action.payload;
      const desIndex = destination?.index;
      const sourceIndex = source.index;
      if (
        action.payload.type === 'COLUMN' &&
        desIndex !== undefined &&
        sourceIndex !== undefined &&
        desIndex !== sourceIndex
      ) {
        const [sourceItem] = state.listData.splice(sourceIndex, 1);

        state.listData.splice(desIndex, 0, sourceItem);
      } else if (destination && destination?.droppableId !== source.droppableId) {
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
    deleteCard(state, action: PayloadAction<{ listId: number; cardId: number }>) {
      const findListToUpdate = state.listData.find(item => item.id === action.payload.listId);
      if (findListToUpdate) {
        const findIndexCardDelete = findListToUpdate.cards.findIndex(item => item.id === action.payload.cardId);
        findListToUpdate.cards.splice(findIndexCardDelete, 1);
      }
    },
    addNewColumn(state, action: PayloadAction<{ title: string }>) {
      state.listData.push({
        id: Math.random(),
        board_id: state.boardId || 0,
        title: action.payload.title,
        position: maxBy(state.listData, 'position')?.position || 0 + 1,
        cards: [],
        created_by: 'Kienlv',
        created_at: moment().format('DD/MM/YYYY'),
        updated_at: moment().format('DD/MM/YYYY'),
      });
    },
    updateLabel(state, action: PayloadAction<{ labels: LabelItem[] }>) {
      state.listLabel = action.payload.labels;
    },
    clearData(state, action: PayloadAction) {
      state.boardId = undefined;
      state.listData = [];
      state.listLabel = [];
    },
  },
});

export const {
  setKanBanData,
  updateListData,
  createNewCard,
  updateCard,
  deleteCard,
  addNewColumn,
  clearData,
  updateLabel,
} = homeDataSlice.actions;

export default homeDataSlice.reducer;

/* ----DEFINE_THUNK_FUNCTION----*/

export const fetchDataKanBanList = (): AppThunk => async dispatch => {
  try {
    // const data = await fetch(process.env.REACT_APP_BASE_URL + userName).then(response => response.json());
    // const { data } = await axiosInstance.get<UserGithub>(userName);
    // dispatch(setKanBanData({ boardId: 1, listData: listKanBan, listLabel: labels }));
  } catch (e) {
    console.log('error', e);
  }
};

/* ----DEFINE_SELECTOR----*/

export const selectKanBanData = (state: RootState): KanBanData => state.kanBanData;

export const selectListData = createSelector(selectKanBanData, (kanBanData: KanBanData) => kanBanData.listData);
export const selectListLabel = createSelector(selectKanBanData, (kanBanData: KanBanData) => kanBanData.listLabel);
export const selectLabelById = (labelId?: number) =>
  createSelector(selectListLabel, (labels: LabelItem[]) => labels.find(item => item.id === labelId));
