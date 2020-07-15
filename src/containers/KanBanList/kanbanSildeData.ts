import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { AppThunk } from 'redux/store';
import { RootState } from 'redux/rootReducer';
import moment from 'moment';
import { maxBy } from 'lodash';

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

    reOrderKanBanLocal(state, action: PayloadAction<ColumnKanBan[]>) {
      state.listData = action.payload;
    },
    moveCardLocal(state, action: PayloadAction<ColumnKanBan[]>) {
      state.listData = action.payload;
    },
    reOrderCardLocal(state, action: PayloadAction<ColumnKanBan[]>) {
      state.listData = action.payload;
    },
    createNewCardLocal(state, action: PayloadAction<PostNewCard>) {
      const findListToUpdate = state.listData.find(item => item.id === action.payload.list_id);
      if (findListToUpdate) {
        findListToUpdate.cards.push({
          id: Math.random(),
          list_id: action.payload.list_id,
          title: action.payload.title,
          description: action.payload.description,
          position: maxBy(findListToUpdate.cards, 'position')?.position || 0 + 1,
          labels: [],
          created_by: action.payload.created_by,
          created_at: moment().format('DD/MM/YYYY'),
        });
      }
    },
    updateCardLocal(state, action: PayloadAction<{ cardId: number; cardItemPost: PostNewCard }>) {
      const { cardItemPost, cardId } = action.payload;
      const findListToUpdateIndex = state.listData.findIndex(item => item.id === cardItemPost.list_id);
      if (findListToUpdateIndex > -1) {
        const cardUpdateIndex = state.listData[findListToUpdateIndex].cards.findIndex(card => card.id === cardId);
        if (cardUpdateIndex > -1) {
          const findLabel = state.listLabel.find(item => item.id === cardItemPost.label_ids?.[0]);
          state.listData[findListToUpdateIndex].cards[cardUpdateIndex] = {
            ...state.listData[findListToUpdateIndex].cards[cardUpdateIndex],
            title: cardItemPost.title,
            description: cardItemPost.description,
            assign: cardItemPost.assign,
            due_date: cardItemPost.due_date,
            labels: (findLabel && [findLabel]) || [],
          };
        }
      }
    },
    deleteCardLocal(state, action: PayloadAction<{ listId: number; cardId: number }>) {
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
  createNewCardLocal,
  updateCardLocal,
  deleteCardLocal,
  addNewColumn,
  clearData,
  updateLabel,
  moveCardLocal,
  reOrderCardLocal,
  reOrderKanBanLocal,
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
