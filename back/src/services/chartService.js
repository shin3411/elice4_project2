import { Chart } from "../db";

class chartService {
  static async getCharts() {
    const charts = await Chart.findAll();
    return charts;
  }
}

export { chartService };
