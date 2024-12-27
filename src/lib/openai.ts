// Estimate my lap time on #{list_of_tracks} based on my bike and performance on the following tracks with the bike:
// Bike: #{model.make.name}-#{model.name} #{year}
// Performance:
//  #{lap_times}

// Consider differences in track length, technical complexity, and the bike’s performance characteristics. Provide a single realistic estimated lap time range for the tracks specified. Keep in mind that the official MotoGP lap times will be faster if applicable, but the estimates should be grounded in the capabilities of a #{model.make.name}-#{model.name} #{year} on these tracks.

// Response format:
// #{estimate_lap_times}
// Explanation: [Brief explanation]
//
// I want to generate detailed lap time estimations for users based on their motorcycle performance and tracks they want analyzed. Each response should provide realistic estimations and explanations to justify them. Here are the details:
//
// #### User Data:
// - **Bike**: Yamaha YZF-R1 2023
// - **Track Performance**:
//   - Calabogie Motorsports Park: 2:16.72
//     - Shannonville Motorsport Park: 2:10
//       - Canadian Tire Motorsport Park: 1:34.7
//       - **Tracks to Estimate**:
//         - Autódromo Internacional do Algarve
//           - Chang International Circuit
//
//           #### Requirements:
//           1. Provide a realistic lap time range for each requested track based on the user's performance data and the track's characteristics.
//           2. Explain the estimation in detail, highlighting specific track features (e.g., elevation changes, straights, technical sections) and how they relate to the user's past performance.
//           3. Format the response as JSON with this structure:
//           \`\`\`json
//           {
//             "bike": "string",
//               "estimates": [
//                   {
//                         "track": "string",
//                               "lap_time_range": {
//                                       "min": "float",
//                                               "max": "float"
//                                                     },
//                                                           "explanation": "string"
//                                                               }
//                                                                 ]
//                                                                 }
//                               }
//                   }
//               ]
//           }
