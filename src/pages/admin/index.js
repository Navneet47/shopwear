import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import FullLayout from "@/layouts/FullLayout";
import BlogCard from "@/Components/dashboard/BlogCard";
import SalesOverview from "@/Components/dashboard/SalesOverview";
import DailyActivity from "@/Components/dashboard/DailyActivity";
import ProductPerfomance from "@/Components/dashboard/AllProducts";

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`footer{display:none}`}</style>
    <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductPerfomance />
      </Grid>
      <Grid item xs={12} lg={12}>
        <BlogCard />
      </Grid>
    </Grid>
    </FullLayout>
    </ThemeProvider>
  );
}
