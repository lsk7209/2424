import { SafetyResult } from '@/types';

/**
 * 전세 사기 위험도 계산
 */
export function calculateSafetyRisk(
    marketValue: number,
    deposit: number,
    mortgage: number
): SafetyResult {
    // 위험 비율 계산
    const riskRatio = ((mortgage + deposit) / marketValue) * 100;

    // 위험 수준 판정
    let level: 'safe' | 'warning' | 'danger';
    let message: string;
    let advice: string[];

    if (riskRatio < 70) {
        level = 'safe';
        message = '안심하세요! 비교적 안전한 전세 계약입니다.';
        advice = [
            '그래도 전세보증보험 가입을 권장합니다.',
            '계약서에 특약 사항을 꼼꼼히 확인하세요.',
            '등기부등본을 정기적으로 확인하세요.',
        ];
    } else if (riskRatio < 80) {
        level = 'warning';
        message = '주의가 필요합니다! 보증보험 가입이 거절될 수 있습니다.';
        advice = [
            '전세보증보험 가입 가능 여부를 먼저 확인하세요.',
            '집주인의 재정 상태를 추가로 확인해보세요.',
            '가능하다면 보증금을 낮추는 것을 고려하세요.',
            '법무사와 상담하여 안전장치를 마련하세요.',
        ];
    } else {
        level = 'danger';
        message = 'STOP! 깡통전세 위험이 매우 높습니다. 계약을 재고하세요.';
        advice = [
            '이 계약은 매우 위험합니다. 계약하지 마세요!',
            '전세보증보험 가입이 거의 불가능합니다.',
            '집주인이 대출을 갚지 못하면 보증금을 돌려받기 어렵습니다.',
            '다른 매물을 찾아보시기를 강력히 권장합니다.',
            '부득이하게 계약해야 한다면 반드시 법률 전문가와 상담하세요.',
        ];
    }

    return {
        risk_ratio: Math.round(riskRatio * 10) / 10,
        level,
        message,
        advice,
    };
}

/**
 * 금액 포맷팅 (억 단위)
 */
export function formatAmount(amount: number): string {
    const eok = Math.floor(amount / 10000);
    const man = amount % 10000;

    if (eok === 0) {
        return `${man.toLocaleString()}만원`;
    } else if (man === 0) {
        return `${eok}억원`;
    } else {
        return `${eok}억 ${man.toLocaleString()}만원`;
    }
}
