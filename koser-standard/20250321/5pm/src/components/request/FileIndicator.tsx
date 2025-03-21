import { Typography } from "@components/common";
import { Label } from "@components/form";
import { useResponsive } from "@hooks";

type FileIndicatorProps = {
  total?: number;
  count?: number;
};

/**
 * @name FileIndicator
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @property {number} total     - 최대 파일 업로드 갯수
 * @property {number} count     - 현재까지 업로드 된 파일 갯수
 */

export default function FileIndicator({
                                        total,
                                        count,
                                      }: FileIndicatorProps) {
  const [isMobile] = useResponsive();

  return (
    <div className="_file-indicator">
      <Label
        required={true}
        labelText="파일 업로드"
      />

      {(total && count) &&
        <>
          <Typography
            kind={isMobile ? "body-large" : "headline-small"}
            isBold={true}
            className="ml-2 text-koser-main-100"
          >
            {count}
          </Typography>
          <Typography
            kind={isMobile ? "body-large" : "headline-small"}
            className="text-koser-grayscale-80"
          >
            /{total}
          </Typography>
        </>
      }
    </div>
  );
}
