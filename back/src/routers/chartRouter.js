import { Router } from "express";
import { chartService } from "../services/chartService";

const chartRouter = Router();

chartRouter.get("/charts", async (req, res, next) => {
  try {
    const charts = await chartService.getCharts();
    res.status(200).json(charts);
  } catch(err) {
      next(err);
  }
})

export { chartRouter };