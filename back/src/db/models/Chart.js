import { ChartModel } from "../schemas/chart";

class Chart {
  static async findAll() {
    const charts = await ChartModel.find({});
    return charts;
  }
}

export { Chart };