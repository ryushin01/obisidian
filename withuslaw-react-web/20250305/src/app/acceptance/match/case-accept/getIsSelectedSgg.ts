type TParams = {
  selectedRegionListData?: Record<string, string | null>[];
  selectedRegionData?: Record<string, string | null>;
  target: Record<string, string | null>;
};

const checkIsSelectedSgg = (
  data: Record<string, string | null>,
  target: Record<string, string | null>
) => {
  const SIDO_CD = "sidoCd";
  const SGG_CD = "sggCd";

  const isEqualSido = data[SIDO_CD] === target[SIDO_CD];
  if (data[SGG_CD] === null) return target[SGG_CD] === "00" && isEqualSido;

  return isEqualSido && data[SGG_CD] === target[SGG_CD];
};

export const getIsSelectedSgg = ({
  selectedRegionListData,
  selectedRegionData,
  target,
}: TParams) => {
  if (!!selectedRegionListData)
    return selectedRegionListData.some((region) =>
      checkIsSelectedSgg(region, target)
    );

  if (!!selectedRegionData) {
    return checkIsSelectedSgg(selectedRegionData, target);
  }
};
