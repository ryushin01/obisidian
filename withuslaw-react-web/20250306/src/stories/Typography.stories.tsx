import type { Meta, StoryObj } from "@storybook/react";
import { TypographyType } from "@/app/_components/typography/Constant";
import { Typography } from "@/app/_components";

const meta = {
  title: "Kos/Typography",
  component: Typography,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   color: {
  //     control: {
  //       type: "multi-select",
  //       options: ["text-kos-orange-500", "text-kos-logo-brown"],
  //     },
  //   },
  // },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => (
  <div className="flex gap-4">
    <table className="border border-1 border-kos-gray-600 bg-kos-gray-100">
      <thead>
        <th>Type</th>
        <th>Size</th>
      </thead>
      <tbody>
        <tr>
          <th>H1</th>
          <td>
            <Typography color={"text-kos-logo-brown"} type={TypographyType.H1}>
              Head/Bold/24px
            </Typography>
          </td>
        </tr>
        <tr>
          <th>H2</th>
          <td>
            <Typography color={"text-kos-logo-brown"} type={TypographyType.H2}>
              Head/Bold/21px
            </Typography>
          </td>
        </tr>
        <tr>
          <th>H3</th>
          <td>
            <Typography color={"text-kos-logo-brown"} type={TypographyType.H3}>
              Head/Semibold/18px
            </Typography>
          </td>
        </tr>
        <tr>
          <th>H4</th>
          <td>
            <Typography color={"text-kos-logo-brown"} type={TypographyType.H4}>
              Head/Regular,Number/17px
            </Typography>
          </td>
        </tr>
        <tr>
          <th>H5</th>
          <td>
            <Typography color={"text-kos-logo-brown"} type={TypographyType.H5}>
              Head/Semibold/16px
            </Typography>
          </td>
        </tr>
        <tr>
          <th>H6</th>
          <td>
            <Typography color={"text-kos-logo-brown"} type={TypographyType.H6}>
              Head/Bold/15px
            </Typography>
          </td>
        </tr>
      </tbody>
    </table>
    <table className="border border-1 border-kos-gray-600 bg-kos-gray-100">
      <thead>
        <th>Type</th>
        <th>Size</th>
      </thead>
      <tbody>
        <tr>
          <th>B1</th>
          <td>
            <Typography color={"text-kos-logo-brown"} type={TypographyType.B1}>
              Body/Medium/16px
            </Typography>
          </td>
        </tr>
        <tr>
          <th>B2</th>
          <td>
            <Typography color={"text-kos-logo-brown"} type={TypographyType.B2}>
              Body/Semibold/15px
            </Typography>
          </td>
        </tr>
        <tr>
          <th>B3</th>
          <td>
            <Typography color={"text-kos-logo-brown"} type={TypographyType.B3}>
              Body/Medium/15px
            </Typography>
          </td>
        </tr>
        <tr>
          <th>B4</th>
          <td>
            <Typography color={"text-kos-logo-brown"} type={TypographyType.B4}>
              Body/Semibold/14px
            </Typography>
          </td>
        </tr>
        <tr>
          <th>B5</th>
          <td>
            <Typography color={"text-kos-logo-brown"} type={TypographyType.B5}>
              Body/Medium/13px
            </Typography>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
