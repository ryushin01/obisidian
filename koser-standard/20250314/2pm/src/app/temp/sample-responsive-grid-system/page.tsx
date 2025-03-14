import { Grid, GridItem } from "@components/layout";

export default function SampleResponsiveGridSystem() {
  return (
    <div className="h-screen">
      <Grid>
        <GridItem desktop={2} tablet={6} mobile={12}>
          <div>A</div>
        </GridItem>
        <GridItem desktop={10} tablet={6} mobile={12}>
          <div>B</div>
        </GridItem>
      </Grid>

      <Grid>
        <GridItem desktop={6} tablet={4} mobile={12}>
          <div>1</div>
        </GridItem>
        <GridItem desktop={4} tablet={4} mobile={12}>
          <div>2</div>
        </GridItem>
        <GridItem desktop={2} tablet={4} mobile={12}>
          <div>3</div>
        </GridItem>
      </Grid>
    </div>
  );
}
