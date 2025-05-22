export const mockPlayers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

export const mockEvents = [
  {
    id: 1,
    name: "Weekly Tournament",
    date: "2025-05-25",
    course: "Lake of the Sandhills Golf Course",
    details: "18-hole stroke play",
  },
];

export const mockWeeklyResults = [
  {
    id: 1,
    weekNumber: 1,
    winners: ["John Doe", "Jane Smith"],
    winnersScore: 68,
    secondPlace: ["Bob Johnson", "Alice Brown"],
    secondPlaceScore: 70,
    highestScore: ["Tom Wilson", "Sarah Davis"],
    highestScoreScore: 85,
    deucePot: ["John Doe"],
    closestToPin: ["Jane Smith"],
    prizePool: 100,
    prizes: { winners: 30, secondPlace: 20, highestScore: 10, deucePot: 20, closestToPin: 20 },
  },
];

export const mockNews = [
  { id: 1, date: "2025-05-20", details: "New season starts next week!" },
];

export const mockLeaderboard = [
  {
    id: 1,
    name: "John Doe",
    wins: 2,
    secondPlace: 1,
    highestScore: 3,
    deucePot: 0,
    closestToPin: 1,
    points: 150,
  },
];

export const mockScoringSystem = { pointsSystem: true };