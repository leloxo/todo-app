import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../utils/api';
import { Todo } from '../types/types';

interface TodoState {
    items: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    items: [],
    loading: false,
    error: null,
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
    reducers: {},
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
            .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                const index = state.items.findIndex((todo) => todo.id === action.payload.id);
                if (index >= 0) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(removeTodo.fulfilled, (state, action: PayloadAction<Number>) => {
                state.items = state.items.filter((todo) => todo.id !== action.payload);
            });
    },
});

export default todoSlice.reducer;
