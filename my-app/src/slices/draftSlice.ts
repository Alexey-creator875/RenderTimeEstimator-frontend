import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
import { type DsRenderServerUnit } from "../api/Api";
import { withProxyMedia } from "../modules/mediaUrl";
import { setAuthenticatedAction } from "./userSlice";

interface DraftState {
    draft: DsRenderServerUnit | null;
    loading: boolean;
    error: string | null;
}

const initialState: DraftState = {
    draft: null,
    loading: false,
    error: null,
};

// текст ошибки из ответа бэкенда ({ error: "..." }) или запасной вариант
const getErrorMessage = (error: any, fallback: string): string =>
    error?.response?.data?.error ?? fallback;

// Получение черновика текущего пользователя (если его нет, бэкенд вернёт null)
export const getDraft = createAsyncThunk(
    "draft/getDraft",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.api.draftRenderServerUnitsList();
            const unit = response.data.renderServerUnit;
            return unit ? withProxyMedia(unit) : null;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Ошибка при загрузке черновика"));
        }
    }
);

// Шаг 1: создание черновика (название процессора, фото и видео)
export const createDraft = createAsyncThunk(
    "draft/createDraft",
    async (
        data: { processor: string; image?: File; video?: File },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.api.renderServerUnitsCreate(data);
            const unit = response.data.renderServerUnit;
            return unit ? withProxyMedia(unit) : null;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Не удалось создать черновик"));
        }
    }
);

// Шаг 2: публикация черновика (ядра, RAM, описание)
export const publishDraft = createAsyncThunk(
    "draft/publishDraft",
    async (
        data: { cores: number; ram: number; description: string },
        { rejectWithValue }
    ) => {
        try {
            await api.api.renderServerUnitsUpdate(data);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Не удалось опубликовать"));
        }
    }
);

const draftSlice = createSlice({
    name: "draft",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // черновик принадлежит пользователю, при входе и выходе сбрасываем его
            .addCase(setAuthenticatedAction, (state) => {
                state.draft = null;
                state.error = null;
            })
            .addCase(getDraft.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDraft.fulfilled, (state, action) => {
                state.loading = false;
                state.draft = action.payload;
            })
            .addCase(getDraft.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createDraft.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDraft.fulfilled, (state, action) => {
                state.loading = false;
                state.draft = action.payload;
            })
            .addCase(createDraft.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(publishDraft.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(publishDraft.fulfilled, (state) => {
                state.loading = false;
                state.draft = null;
            })
            .addCase(publishDraft.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default draftSlice.reducer;
