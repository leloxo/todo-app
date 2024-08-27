import axios from 'axios';
import { Todo } from '../types/types';

const API_URL = 'http://localhost:8080/api/todos';

export const getAllTodos = async (): Promise<Todo[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error:', error.message);
            throw new Error(`Error: ${error.message}`);
        } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const getTodoById = async (id: number): Promise<Todo> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error:', error.message);
            throw new Error(`Error: ${error.message}`);
        } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    try {
        const response = await axios.post(API_URL, todo);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error:', error.message);
            throw new Error(`Error: ${error.message}`);
        } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const updateTodo = async (id: number, todo: Todo): Promise<Todo> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, todo);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error:', error.message);
            throw new Error(`Error: ${error.message}`);
        } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const deleteTodo = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error:', error.message);
            throw new Error(`Error: ${error.message}`);
        } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};