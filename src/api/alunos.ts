import apiClient from './client';
import { Aluno } from '../types/types';

export const getAlunos = async (): Promise<Aluno[]> => {
  const response = await apiClient.get<Aluno[]>('aluno/');
  return response.data;
};

export const createAluno = async (aluno: Omit<Aluno, 'id'>): Promise<Aluno> => {
  const response = await apiClient.post<Aluno>('aluno/', aluno);
  return response.data;
};

export const updateAluno = async (id: number, aluno: Aluno): Promise<Aluno> => {
  const response = await apiClient.put<Aluno>(`aluno/${id}/`, aluno);
  return response.data;
};

export const deleteAluno = async (id: number): Promise<void> => {
  await apiClient.delete(`aluno/${id}/`);
};