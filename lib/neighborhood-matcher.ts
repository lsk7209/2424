import { UserAnswers, ScoreResult, NeighborhoodResult } from '@/types';
import { neighborhoodQuestions } from '@/data/neighborhood-questions';
import { neighborhoodResults } from '@/data/neighborhood-results';

/**
 * 사용자 답변을 기반으로 점수 계산
 */
export function calculateScores(answers: UserAnswers): ScoreResult {
    let totalVibe = 0;
    let totalInfra = 0;
    let totalBudget = 0;
    let count = 0;

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
        const question = neighborhoodQuestions.find(q => q.id === Number(questionId));
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
 * 점수를 기반으로 가장 적합한 동네 찾기
 */
function findBestMatch(
    scores: ScoreResult,
    neighborhoods: NeighborhoodResult[],
    includeBudget: boolean
): NeighborhoodResult {
    let bestMatch = neighborhoods[0];
    let bestScore = -1;

    neighborhoods.forEach(neighborhood => {
        // 간단한 매칭 로직: 동네별로 점수 범위 설정
        let matchScore = 0;

        // vibe와 infra 점수가 높을수록 이상형 동네에 매칭
        const totalPreference = scores.vibe + scores.infra;

        if (neighborhood.match_type === 'ideal') {
            // 이상형 동네는 vibe + infra가 높을 때 매칭
            matchScore = totalPreference;

            if (includeBudget) {
                // 현실 매칭일 때는 budget도 고려
                matchScore = matchScore - Math.abs(scores.budget - 8) * 2;
            }
        } else {
            // 현실형 동네는 budget이 낮을 때 매칭
            matchScore = 20 - totalPreference;

            if (includeBudget) {
                matchScore = matchScore + (10 - scores.budget) * 2;
            }
        }

        // 랜덤 요소 추가 (같은 점수일 때 다양성 확보)
        matchScore += Math.random() * 2;

        if (matchScore > bestScore) {
            bestScore = matchScore;
            bestMatch = neighborhood;
        }
    });

    return bestMatch;
}

/**
 * 이상형 동네 찾기 (budget 제외)
 */
export function findIdealNeighborhood(scores: ScoreResult): NeighborhoodResult {
    const idealNeighborhoods = neighborhoodResults.filter(n => n.match_type === 'ideal');
    return findBestMatch(scores, idealNeighborhoods, false);
}

/**
 * 현실형 동네 찾기 (budget 포함)
 */
export function findRealNeighborhood(scores: ScoreResult): NeighborhoodResult {
    const realNeighborhoods = neighborhoodResults.filter(n => n.match_type === 'real');
    return findBestMatch(scores, realNeighborhoods, true);
}

/**
 * 전체 매칭 결과 반환
 */
export function getMatchResults(answers: UserAnswers) {
    const scores = calculateScores(answers);
    const idealMatch = findIdealNeighborhood(scores);
    const realMatch = findRealNeighborhood(scores);

    return {
        scores,
        idealMatch,
        realMatch,
    };
}
