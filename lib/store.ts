import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserAnswers } from '@/types';

interface NeighborhoodTestStore {
    answers: UserAnswers;
    currentQuestion: number;
    setAnswer: (questionId: number, optionIndex: number) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
    resetTest: () => void;
    isCompleted: () => boolean;
}

export const useNeighborhoodTest = create<NeighborhoodTestStore>()(
    persist(
        (set, get) => ({
            answers: {},
            currentQuestion: 1,

            setAnswer: (questionId, optionIndex) => {
                set((state) => ({
                    answers: {
                        ...state.answers,
                        [questionId]: optionIndex,
                    },
                }));
            },

            nextQuestion: () => {
                set((state) => ({
                    currentQuestion: Math.min(state.currentQuestion + 1, 10),
                }));
            },

            prevQuestion: () => {
                set((state) => ({
                    currentQuestion: Math.max(state.currentQuestion - 1, 1),
                }));
            },

            resetTest: () => {
                set({
                    answers: {},
                    currentQuestion: 1,
                });
            },

            isCompleted: () => {
                const { answers } = get();
                return Object.keys(answers).length === 10;
            },
        }),
        {
            name: 'neighborhood-test-storage',
        }
    )
);
