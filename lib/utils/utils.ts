import mempoolJS from "@mempool/mempool.js";

export const sleeper = async (seconds: number) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export function onlyUnique<T>(value: T, index: number, array: T[]) {
  return array.indexOf(value) === index;
}

export async function getBtcRecommendFees(): Promise<number> {
  const {
    bitcoin: { fees },
  } = mempoolJS({
    hostname: "mempool.space",
  });

  try {
    const feesRecommended = await fees.getFeesRecommended();
    // 将feesRecommended.fastestFee转换为数字
    const feeNumber = Number(feesRecommended.halfHourFee);
    // 检查转换后的值是否为有效数字
    return isNaN(feeNumber) ? 80 : feeNumber;
  } catch (err) {
    // 在异常情况下返回默认值
    return 80;
  }
}
