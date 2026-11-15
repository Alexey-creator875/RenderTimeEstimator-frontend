import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
import {
    type HandlerRenderServerUnitDetail,
    type HandlerRenderServerUnitListItem,
} from "../api/Api";
import { RENDER_SERVER_UNITS_MOCK } from "../modules/mock";

export const MIN_RAM = 8;
export const MAX_RAM = 128;

interface RenderServerUnitsState {
    minValue: number;
    maxValue: number;
    items: HandlerRenderServerUnitListItem[];
    loading: boolean;
    error: string | null;
    // карточка ленты
    current: HandlerRenderServerUnitDetail | null;
    currentLoading: boolean;
    currentError: string | null;
    likeLoading: boolean;
}

const initialState: RenderServerUnitsState = {
    minValue: MIN_RAM,
    maxValue: MAX_RAM,
    items: [],
    loading: false,
    error: null,
    current: null,
    currentLoading: false,
    currentError: null,
    likeLoading: false,
};

const filterMock = (minValue: number, maxValue: number) =>
    RENDER_SERVER_UNITS_MOCK.renderServerUnits.filter(
        (item) => item.ram >= minValue && item.ram <= maxValue
    );

// Загрузка списка серверов с учётом фильтра из store
export const getRenderServerUnits = createAsyncThunk(
    "renderServerUnits/getRenderServerUnits",
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as {
            user: { isAuthenticated: boolean };
            renderServerUnits: RenderServerUnitsState;
        };
        const { minValue, maxValue } = state.renderServerUnits;

        try {
            const response = await api.api.renderServerUnitsList({
                min: minValue,
                max: maxValue,
            });
            return response.data.renderServerUnits ?? [];
        } catch {
            // Если бэкенд недоступен, гостю показываем mock-данные
            if (!state.user.isAuthenticated) {
                return filterMock(minValue, maxValue);
            }
            return rejectWithValue("Ошибка при загрузке данных");
        }
    }
);

// Загрузка карточки ленты по id. При next=true возвращается следующая за id карточка
export const getRenderServerUnit = createAsyncThunk(
    "renderServerUnits/getRenderServerUnit",
    async (
        { id, next }: { id: number; next?: boolean },
        { getState, rejectWithValue }
    ) => {
        const state = getState() as { user: { isAuthenticated: boolean } };

        try {
            const response = await api.api.renderServerUnitsDetail(
                id,
                next ? { next: "true" } : undefined
            );
            const unit = response.data.renderServerUnit;
            if (!unit) {
                return rejectWithValue("Сервер не найден");
            }
            return unit;
        } catch {
            // Если бэкенд недоступен, гостю показываем mock-данные
            if (!state.user.isAuthenticated) {
                const units = RENDER_SERVER_UNITS_MOCK.renderServerUnits;
                const index = units.findIndex((item) => item.id === id);
                const found = next ? units[(index + 1) % units.length] : units[index];
                if (found) {
                    return { ...found, is_liked: false };
                }
            }
            return rejectWithValue("Ошибка при загрузке данных");
        }
    }
);

// Поставить (like = true) или снять (like = false) лайк. Только для авторизованных
export const likeRenderServerUnit = createAsyncThunk(
    "renderServerUnits/likeRenderServerUnit",
    async (
        { id, like }: { id: number; like: boolean },
        { rejectWithValue }
    ) => {
        try {
            await api.api.renderServerUnitsLikeCreate(id, { like });
            return { id, like };
        } catch {
            return rejectWithValue("Не удалось изменить лайк");
        }
    }
);

const renderServerUnitsSlice = createSlice({
    name: "renderServerUnits",
    initialState,
    reducers: {
        setMinValue(state, {payload}) {
            state.minValue = payload
        },
        setMaxValue(state, {payload}) {
            state.maxValue = payload
        },
        resetFilter(state) {
            state.minValue = MIN_RAM
            state.maxValue = MAX_RAM
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRenderServerUnits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRenderServerUnits.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getRenderServerUnits.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) ?? "Ошибка при загрузке данных";
            })
            .addCase(getRenderServerUnit.pending, (state) => {
                state.currentLoading = true;
                state.currentError = null;
            })
            .addCase(getRenderServerUnit.fulfilled, (state, action) => {
                state.currentLoading = false;
                state.current = action.payload;
            })
            .addCase(getRenderServerUnit.rejected, (state, action) => {
                state.currentLoading = false;
                state.currentError = (action.payload as string) ?? "Ошибка при загрузке данных";
            })
            .addCase(likeRenderServerUnit.pending, (state) => {
                state.likeLoading = true;
            })
            .addCase(likeRenderServerUnit.fulfilled, (state, action) => {
                state.likeLoading = false;
                const { id, like } = action.payload;
                const current = state.current;
                // бэкенд счётчик не возвращает, поэтому обновляем его локально
                if (current && current.id === id && current.is_liked !== like) {
                    current.is_liked = like;
                    current.likes_number = (current.likes_number ?? 0) + (like ? 1 : -1);
                }
            })
            .addCase(likeRenderServerUnit.rejected, (state) => {
                state.likeLoading = false;
            });
    },
});

export const {
    setMinValue: setMinValueAction,
    setMaxValue: setMaxValueAction,
    resetFilter: resetFilterAction,
} = renderServerUnitsSlice.actions

export default renderServerUnitsSlice.reducer
