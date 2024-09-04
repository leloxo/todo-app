import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createTodo, deleteTodo, getAllTodos, updateTodo} from '../utils/api';
import {Todo} from '../types/types';

export interface TodoState {
    items: Todo[];
    loading: boolean;
    error: string | null;
    navigation: NavigationState;
    selectedItemId: number | null;
    isCompletedTaskContainerExpanded: boolean;
}

export enum NavigationState {
    CREATE = 'CREATE',
    EDIT = 'EDIT',
    DEFAULT = 'DEFAULT',
}

const initialState: TodoState = {
    items: [],
    loading: false,
    error: null,
    navigation: NavigationState.DEFAULT,
    selectedItemId: null,
    isCompletedTaskContainerExpanded: true,
};

export const getTodos = createAsyncThunk('todos/getTodos', async () => {
    return await getAllTodos();
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo: Todo) => {
    return await createTodo(todo);
});

export const editTodo = createAsyncThunk('todos/editTodos', async ({ id, todo }: { id: number; todo: Todo; }) => {
    return await updateTodo(id, todo);
});

export const removeTodo = createAsyncThunk('todos/removeTodos', async (id: number) => {
    await deleteTodo(id);
    return id;
});

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        setNavigationState: (state, action: PayloadAction<NavigationState>) => {
            state.navigation = action.payload;
        },
        setSelectedItemId: (state, action: PayloadAction<number>) => {
            state.selectedItemId = action.payload;
        },
        setCompletedTaskExpanded: (state, action: PayloadAction<boolean>) => {
            state.isCompletedTaskContainerExpanded = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch todos.';
                state.loading = false;
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.items.push(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to add todo.';
                state.loading = false;
            })
            .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                const index = state.items.findIndex((todo) => todo.id === action.payload.id);
                if (index >= 0) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(editTodo.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to edit todo.';
                state.loading = false;
            })
            .addCase(removeTodo.fulfilled, (state, action: PayloadAction<Number>) => {
                state.items = state.items.filter((todo) => todo.id !== action.payload);
            })
            .addCase(removeTodo.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete todo.';
                state.loading = false;
            });
    },
});

export const { setNavigationState, setSelectedItemId, setCompletedTaskExpanded } = todoSlice.actions;

export default todoSlice.reducer;
