import Log from "../models/log.model.js";

export const getStats = async (req, res) => {
  try {
    const { range = "week" } = req.query;
    let groupId = {};
    let projectStage = {};

    switch (range) {
      case "day":
        groupId = {
          year: { $year: "$timestamp" },
          month: { $month: "$timestamp" },
          day: { $dayOfMonth: "$timestamp" },
        };
        projectStage = {
          label: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
          },
        };
        break;

      case "week":
        groupId = {
          year: { $year: "$timestamp" },
          week: { $week: "$timestamp" },
        };
        projectStage = {
          label: {
            $concat: [
              { $toString: "$_id.year" },
              "-W",
              { $toString: "$_id.week" },
            ],
          },
        };
        break;

      case "month":
        groupId = {
          year: { $year: "$timestamp" },
          month: { $month: "$timestamp" },
        };
        projectStage = {
          label: {
            $dateToString: { format: "%Y-%m", date: "$timestamp" },
          },
        };
        break;

      case "year":
        groupId = { year: { $year: "$timestamp" } };
        projectStage = {
          label: { $toString: "$_id.year" },
        };
        break;

      default:
        return res.status(400).json({ error: "Invalid range" });
    }

    const stats = await Log.aggregate([
      { $group: { _id: groupId, submissions: { $sum: 1 } } },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1, "_id.day": 1 } },
      {
        $project: {
          _id: 0,
          submissions: 1,
          ...projectStage,
        },
      },
    ]);

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// import Log from "../models/log.model.js";

// export const getStats = async (req, res) => {
//   try {
//     const dailyStats = await Log.aggregate([
//       {
//         $group: {
//           _id: {
//             day: { $dayOfMonth: "$timestamp" },
//             month: { $month: "$timestamp" },
//             year: { $year: "$timestamp" },
//           },
//           count: { $sum: 1 },
//           avgWordCount: { $avg: "$wordCount" },
//           avgSentiment: { $avg: "$sentiment" },
//         },
//       },
//       { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
//     ]);

//     res.json({ dailyStats });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };
