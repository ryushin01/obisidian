"use client";

import { Typography } from "@components";

export default function PrivacyPage() {
  return (
    <>
      <Typography color="text-kos-black" type={Typography.TypographyType.H3}>
        개인정보 처리방침
      </Typography>
      <Typography color="text-kos-gray-700" type={Typography.TypographyType.B1}>
        ㈜뱅크클리어(이하 ‘회사’라 한다)은 개인정보 보호법 제30조에 따라
        정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게
        처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립.
        공개합니다.
      </Typography>

      {/* 제1조 */}
      <section>
        <Typography
          className="sr-only"
          color="text-kos-black"
          type={Typography.TypographyType.H4}
        >
          제1조
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          제1조(개인정보의 처리목적)
          <br />
          회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
          개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
          변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등
          필요한 조치를 이행할 예정입니다.
        </Typography>
        <ol>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.H5}
            >
              1. 홈페이지 회원 가입 및 관리
            </Typography>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증,
              회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스
              부정이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의
              동의여부 확인, 각종 고지․통지, 고충처리 등을 목적으로 개인정보를
              처리합니다.
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.H5}
            >
              2. 재화 또는 서비스 제공
            </Typography>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              물품배송, 서비스 제공, 계약서․청구서 발송, 콘텐츠 제공, 맞춤서비스
              제공, 본인인증, 연령인증, 요금결제․정산, 채권추심 등을 목적으로
              개인정보를 처리합니다.
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.H5}
            >
              3. 고충처리
            </Typography>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지,
              처리결과 통보 등의 목적으로 개인정보를 처리합니다.
            </Typography>
          </li>
        </ol>
      </section>

      {/* 제2조 */}
      <section>
        <Typography
          className="sr-only"
          color="text-kos-black"
          type={Typography.TypographyType.H4}
        >
          제2조
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          제2조(처리하는 개인정보 항목)
          <br />
          회사는 다음의 개인정보 항목을 처리하고 있습니다.
        </Typography>
        <table className="w-full table-fixed">
          <colgroup>
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th rowSpan={2}>필수항목</th>
              <td>
                성명(개인 및 법인명), 법인등록번호, 아이디,
                연락처(휴대전화번호), 비밀번호, 생년월일, 성별, 주소, 계좌번호{" "}
              </td>
            </tr>
            <tr>
              <td>
                사업자 관련 정보 (상호, 사업자등록번호, 주소, 사업장전화번호,
                대표자 성명, 이메일주소, 사업자등록증 사본){" "}
              </td>
            </tr>
            <tr>
              <th>선택항목</th>
              <td>
                공인인증서 정보, 프로필 사진, 팩스번호, 업태, 업종, 추천인 정보,
                공제보험증서{" "}
              </td>
            </tr>
          </tbody>
        </table>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          서비스 이용과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수
          있습니다.
          <br />- IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 부정 이용 기록,
          단말기정보 (OS, 화면사이즈, 기기 고유 식별 값, 광고 식별 값, MCC/MNC
          통신사 국가 정보, LTE/WIFI 네트워크망 정보), 온라인 행태정보, 위치정보
        </Typography>
      </section>

      {/* 제3조 */}
      <section>
        <Typography
          className="sr-only"
          color="text-kos-black"
          type={Typography.TypographyType.H4}
        >
          제3조
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          제3조(개인정보의 처리 및 보유기간)
        </Typography>
        <ol>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ① 회사는 법령에 따른 개인정보 보유․이용 기간 또는 정보주체로부터
              개인정보를 수집시에 동의 받은 개인정보 보유․이용 기간 내에서
              개인정보를 처리․보유 합니다.
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
            </Typography>
            <ol>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  1. 홈페이지 회원 가입 및 관리 : 사업자/단체 홈페이지
                  탈퇴시까지
                </Typography>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료시까지
                </Typography>
                <ol>
                  <li>
                    <Typography
                      color="text-kos-gray-700"
                      type={Typography.TypographyType.B1}
                    >
                      1) 관계 법령 위반에 따른 수사․조사 등이 진행중인 경우에는
                      해당 수사․조사 종료 시까지
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      color="text-kos-gray-700"
                      type={Typography.TypographyType.B1}
                    >
                      2) 홈페이지 이용에 따른 채권․채무 관계 잔존시에는 해당
                      채권․채무 관계 정산시까지
                    </Typography>
                  </li>
                </ol>
              </li>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  2. 재화 또는 서비스 제공 : 재화․서비스 공급완료 및 요금
                  결제․정산 완료시까지
                </Typography>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료시까지
                </Typography>
                <ol>
                  <li>
                    <Typography
                      color="text-kos-gray-700"
                      type={Typography.TypographyType.B1}
                    >
                      1) 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른
                      표시․광고, 계약내용 및 이행 등 거래에 관한 기록
                    </Typography>
                    <ul>
                      <li>
                        <Typography
                          color="text-kos-gray-700"
                          type={Typography.TypographyType.B1}
                        >
                          - 표시․광고에 관한 기록 : 6월
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          color="text-kos-gray-700"
                          type={Typography.TypographyType.B1}
                        >
                          - 계약 또는 청약철회, 대금결제, 재화 등의 공급기록 :
                          5년
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          color="text-kos-gray-700"
                          type={Typography.TypographyType.B1}
                        >
                          - 소비자 불만 또는 분쟁처리에 관한 기록 : 3년
                        </Typography>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Typography
                      color="text-kos-gray-700"
                      type={Typography.TypographyType.B1}
                    >
                      2) 「통신비밀보호법」 제41조에 따른 통신사실확인자료 보관
                    </Typography>
                    <ul>
                      <li>
                        <Typography
                          color="text-kos-gray-700"
                          type={Typography.TypographyType.B1}
                        >
                          - 가입자 전기통신일시, 개시․종료 시간, 상대방
                          가입자번호, 사용 도수, 발신기지국 위치추적자료 : 1년
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          color="text-kos-gray-700"
                          type={Typography.TypographyType.B1}
                        >
                          - 컴퓨터통신, 인터넷 로그기록자료, 접속지 추적 자료 :
                          3개월
                        </Typography>
                      </li>
                    </ul>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
      </section>

      {/* 제4조 */}
      <section>
        <Typography
          className="sr-only"
          color="text-kos-black"
          type={Typography.TypographyType.H4}
        >
          제4조
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          제4조(개인정보의 제3자 제공)
        </Typography>
        <ol>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서
              명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정
              등 개인정보 보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게
              제공합니다.
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ② 회사는 다음과 같은 경우에 개인정보를 제3자에게 제공할 수
              있습니다.
            </Typography>
            <ol>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  1. 서비스 제공에 따른 요금정산을 위하여 필요한 경우
                </Typography>
              </li>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  2. 회사가 제공하는 서비스를 통하여 업무가 진행된 경우, 업무
                  당사자간의 원활한 의사소통을 위하여 관련된 정보를 필요한 범위
                  내에서 업무 당사자에게 제공하는 경우
                </Typography>
              </li>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  3. 통계작성, 학술연구나 시장조사를 위해 특정 개인을 식별할 수
                  없는 형태로 가공하여 제공하는 경우
                </Typography>
              </li>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  4. 이용자들이 사전에 동의한 경우
                </Typography>
              </li>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  5. 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진
                  절차와 방법에 따라 수사기관의 요구가 있는 경우
                </Typography>
              </li>
            </ol>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ③ 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보를
              제3자에게 제공합니다.
            </Typography>
            <table className="w-full table-fixed">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>제공 업체</th>
                  <th>제공 목적</th>
                  <th>제공 정보</th>
                  <th>보유 기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>삼정데이타서비스㈜ </th>
                  <td>메일, 문자, 카카오메세지 발송</td>
                  <td>이름, 휴대폰번호, 이메일주소</td>
                  <td rowSpan={2}>
                    제공목적 달성 시까지. 단, 관련 법령에 따른 보관 의무가 있을
                    경우 해당 기간 동안 보관.
                  </td>
                </tr>
                <tr>
                  <th>㈜엘지유플러스</th>
                  <td>서비스 제공 및 상담</td>
                  <td>이름, 생년월일, 휴대폰번호</td>
                </tr>
              </tbody>
            </table>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ④ 이용자의 동의가 없는 경우 제3자에게 제공하지 않습니다, 하지만 이
              경우 서비스 이용이 제한될 수 있습니다.
            </Typography>
          </li>
        </ol>
      </section>

      {/* 제5조 */}
      <section>
        <Typography
          className="sr-only"
          color="text-kos-black"
          type={Typography.TypographyType.H4}
        >
          제5조
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          제5조(개인정보처리의 위탁)
        </Typography>
        <ol>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
              처리업무를 위탁하고 있습니다.
            </Typography>
            <table className="w-full table-fixed">
              <colgroup>
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>수탁사</th>
                  <th>위탁 업무 내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>코리아 크레딧뷰로㈜</th>
                  <td>본인확인업무 및 실명확인 업무</td>
                </tr>
                <tr>
                  <th>㈜쿠콘</th>
                  <td>실명확인 및 계좌인증 업무</td>
                </tr>
                <tr>
                  <th>주식회사 토스페이먼츠</th>
                  <td>보험료 결제</td>
                </tr>
                <tr>
                  <th>퍼스트어메리칸권원보험㈜</th>
                  <td>대출진행관리 및 권리보험가입</td>
                </tr>
                <tr>
                  <th>디비손해보험주식회사</th>
                  <td>대출진행관리 및 권리보험가입</td>
                </tr>
              </tbody>
            </table>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ② 회사는 위탁계약 체결 시 개인정보 보호법 제25조에 따라 위탁업무
              수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁
              제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을
              계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
              처리하는지를 감독하고 있습니다.
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본
              개인정보 처리방침을 통하여 공개하도록 하겠습니다.
            </Typography>
          </li>
        </ol>
      </section>

      {/* 제6조 */}
      <section>
        <Typography
          className="sr-only"
          color="text-kos-black"
          type={Typography.TypographyType.H4}
        >
          제6조
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          제6조(정보주체의 권리․의무 및 행사방법)
        </Typography>
        <ol>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련
              권리를 행사할 수 있습니다.
            </Typography>
            <ol>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  1. 개인정보 열람요구
                </Typography>
              </li>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  2. 오류 등이 있을 경우 정정 요구
                </Typography>
              </li>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  3. 삭제요구
                </Typography>
              </li>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  4. 처리정지 요구
                </Typography>
              </li>
            </ol>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편,
              모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이
              조치하겠습니다.
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한
              경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를
              이용하거나 제공하지 않습니다.
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은
              자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법
              시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ⑤ 정보주체는 개인정보 보호법 등 관계법령을 위반하여 회사가
              처리하고 있는 정보주체 본인이나 타인의 개인정보 및 사생활을
              침해하여서는 아니됩니다.
            </Typography>
          </li>
        </ol>
      </section>

      {/* 제7조 */}
      <section>
        <Typography
          className="sr-only"
          color="text-kos-black"
          type={Typography.TypographyType.H4}
        >
          제7조
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          제7조(개인정보의 파기)
        </Typography>
        <ol>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
              불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나
              처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를
              계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의
              데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
            </Typography>
            <ol>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  1. 파기절차
                </Typography>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보
                  보호책임자의 승인을 받아 개인정보를 파기합니다.
                </Typography>
              </li>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  2. 파기방법
                </Typography>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  회사는 전자적 파일 형태로 기록․저장된 개인정보는 기록을 재생할
                  수 없도록 로우레밸포멧(Low Level Format) 등의 방법을 이용하여
                  파기하며, 종이 문서에 기록․저장된 개인정보는 분쇄기로
                  분쇄하거나 소각하여 파기합니다.
                </Typography>
              </li>
            </ol>
          </li>
        </ol>
      </section>

      {/* 제8조 */}
      <section>
        <Typography
          className="sr-only"
          color="text-kos-black"
          type={Typography.TypographyType.H4}
        >
          제8조
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          제8조(개인정보의 안전성 확보조치)
          <br />
          회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
          있습니다.
        </Typography>
        <ol>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              1. 관리적 조치 : 내부관리계획 수립․시행, 정기적 직원 교육 등
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              2. 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리,
              접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제
            </Typography>
          </li>
        </ol>
      </section>

      {/* 제9조 */}
      <section>
        <Typography
          className="sr-only"
          color="text-kos-black"
          type={Typography.TypographyType.H4}
        >
          제9조
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          제9조(개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항)
        </Typography>
        <ol>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ① 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를
              저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의
              컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC
              컴퓨터내의 하드디스크에 저장되기도 합니다.
            </Typography>
            <ol>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  가. 쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹 사이트들에
                  대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을
                  파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
                </Typography>
              </li>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  나. 쿠키의 설치∙운영 및 거부 : 웹브라우저 상단의
                  도구&gt;인터넷 옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키
                  저장을 거부 할 수 있습니다.
                </Typography>
              </li>
              <li>
                <Typography
                  color="text-kos-gray-700"
                  type={Typography.TypographyType.B1}
                >
                  다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이
                  발생할 수 있습니다.
                </Typography>
              </li>
            </ol>
          </li>
        </ol>
      </section>

      {/* 제10조 */}
      <section>
        <Typography
          className="sr-only"
          color="text-kos-black"
          type={Typography.TypographyType.H4}
        >
          제10조
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          제10조(개인정보 보호책임자)
        </Typography>
        <ol>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
              같이 개인정보 보호책임자를 지정하고 있습니다.
              <br />
              ▶ 개인정보 보호책임자
              <br />
              성명 : 김정현
              <br />
              직책 : 이사 <br />
              연락처 : &lt;makepg@bankle.co.kr&gt; &lt;070-5224-0730&gt;
            </Typography>
          </li>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ② 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한
              모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을
              개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는
              정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.
            </Typography>
          </li>
        </ol>
      </section>

      {/* 제11조 */}
      <section>
        <Typography
          className="sr-only"
          color="text-kos-black"
          type={Typography.TypographyType.H4}
        >
          제11조
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          제11조(개인정보 처리방침 변경)
        </Typography>
        <ol>
          <li>
            <Typography
              color="text-kos-gray-700"
              type={Typography.TypographyType.B1}
            >
              ① 이 개인정보 처리방침은 2023. 3. 20. 부터 적용됩니다.
            </Typography>
          </li>
        </ol>
      </section>
    </>
  );
}
