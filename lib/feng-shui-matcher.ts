import { fengShuiQuestions } from '@/data/feng-shui-questions';
import { fengShuiResults } from '@/data/feng-shui-results';
import { FengShuiResult, ScoreResult, UserAnswers } from '@/types';

export function calculateFengShuiScores(answers: UserAnswers): ScoreResult {
  let totalVibe = 0;
  let totalInfra = 0;
  let totalBudget = 0;
  let count = 0;

  Object.entries(answers).forEach(([questionId, optionIndex]) => {
    const question = fengShuiQuestions.find((item) => item.id === Number(questionId));
    if (!question || !question.options[optionIndex]) {
      return;
    }

    const scores = question.options[optionIndex].scores;
    totalVibe += scores.vibe;
    totalInfra += scores.infra;
    totalBudget += scores.budget;
    count += 1;
  });

  return {
    vibe: count > 0 ? Math.round(totalVibe / count) : 0,
    infra: count > 0 ? Math.round(totalInfra / count) : 0,
    budget: count > 0 ? Math.round(totalBudget / count) : 0,
  };
}

export function determineFengShuiType(scores: ScoreResult): FengShuiResult {
  const { vibe, infra, budget } = scores;

  const typeScores = {
    wood: Math.abs(vibe - 4) + Math.abs(infra - 5) + Math.abs(budget - 5),
    fire: Math.abs(vibe - 9) + Math.abs(infra - 8) + Math.abs(budget - 8),
    earth: Math.abs(vibe - 5) + Math.abs(infra - 7) + Math.abs(budget - 6),
    metal: Math.abs(vibe - 6) + Math.abs(infra - 6) + Math.abs(budget - 7),
    water: Math.abs(vibe - 2) + Math.abs(infra - 3) + Math.abs(budget - 4),
  };

  let bestType = 'wood-type';
  let bestScore = typeScores.wood;

  if (typeScores.fire < bestScore) {
    bestType = 'fire-type';
    bestScore = typeScores.fire;
  }
  if (typeScores.earth < bestScore) {
    bestType = 'earth-type';
    bestScore = typeScores.earth;
  }
  if (typeScores.metal < bestScore) {
    bestType = 'metal-type';
    bestScore = typeScores.metal;
  }
  if (typeScores.water < bestScore) {
    bestType = 'water-type';
  }

  const result = fengShuiResults.find((item) => item.id === bestType);
  return result || fengShuiResults[0];
}

export function getFengShuiResult(answers: UserAnswers) {
  const scores = calculateFengShuiScores(answers);
  const result = determineFengShuiType(scores);

  return {
    scores,
    result,
  };
}
