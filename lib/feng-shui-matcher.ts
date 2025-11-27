import { UserAnswers, ScoreResult, FengShuiResult } from '@/types';
import { fengShuiQuestions } from '@/data/feng-shui-questions';
import { fengShuiResults } from '@/data/feng-shui-results';

/**
 * 사용자 답변을 기반으로 점수 계산
 */
export function calculateFengShuiScores(answers: UserAnswers): ScoreResult {
    let totalVibe = 0;
    let totalInfra = 0;
    let totalBudget = 0;
    let count = 0;

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
        const question = fengShuiQuestions.find(q => q.id === Number(questionId));
        if (question && question.options[optionIndex]) {
            const scores = question.options[optionIndex].scores;
            totalVibe += scores.vibe;
            totalInfra += scores.infra;
            totalBudget += scores.budget;
            count++;
        }
    });

    return {
        vibe: count > 0 ? Math.round(totalVibe / count) : 0,
        infra: count > 0 ? Math.round(totalInfra / count) : 0,
        budget: count > 0 ? Math.round(totalBudget / count) : 0,
    };
}

/**
 * 점수를 기반으로 오행 유형 결정
 * 
 * 木(목): 성장, 발전 - vibe 낮음, infra 중간, budget 중간
 * 火(화): 열정, 활동 - vibe 높음, infra 높음, budget 높음
 * 土(토): 안정, 편안 - vibe 중간, infra 높음, budget 중간
 * 金(금): 명확, 효율 - vibe 중간, infra 중간, budget 높음
 * 水(수): 유연, 차분 - vibe 낮음, infra 낮음, budget 낮음
 */
export function determineFengShuiType(scores: ScoreResult): FengShuiResult {
    const { vibe, infra, budget } = scores;
    const totalScore = vibe + infra + budget;

    // 각 유형별 점수 계산
    const typeScores = {
        wood: Math.abs(vibe - 4) + Math.abs(infra - 5) + Math.abs(budget - 5), // 목: 중간-낮음
        fire: Math.abs(vibe - 9) + Math.abs(infra - 8) + Math.abs(budget - 8), // 화: 높음
        earth: Math.abs(vibe - 5) + Math.abs(infra - 7) + Math.abs(budget - 6), // 토: 중간
        metal: Math.abs(vibe - 6) + Math.abs(infra - 6) + Math.abs(budget - 7), // 금: 중간-높음
        water: Math.abs(vibe - 2) + Math.abs(infra - 3) + Math.abs(budget - 4), // 수: 낮음
    };

    // 가장 점수가 낮은 (가장 가까운) 유형 찾기
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
        bestScore = typeScores.water;
    }

    const result = fengShuiResults.find(r => r.id === bestType);
    return result || fengShuiResults[0];
}

/**
 * 전체 풍수지리 결과 반환
 */
export function getFengShuiResult(answers: UserAnswers) {
    const scores = calculateFengShuiScores(answers);
    const result = determineFengShuiType(scores);

    return {
        scores,
        result,
    };
}
