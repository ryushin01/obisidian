import { ResponsiveGridSystem } from "@components/layout";

export default function SampleResponsiveGridSystem() {
  return (
    <div className="h-screen">
      <ResponsiveGridSystem mobile={1} tablet={6} desktop={12}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
      </ResponsiveGridSystem>
    </div>
  );
}
