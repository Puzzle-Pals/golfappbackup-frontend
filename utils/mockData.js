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
    winners: ["John Doe"],
    secondPlace: ["Jane Smith"],
    highestScore: ["John Doe"],
    deucePot: ["Jane Smith"],
    closestToPin: ["John Doe"],
    prizes: { winners: "30", secondPlace: "20", highestScore: "10", deucePot: "20", closestToPin: "20" },
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
  {
    id: 2,
    name: "Jane Smith",
    wins: 1,
    secondPlace: 2,
    highestScore: 1,
    deucePot: 2,
    closestToPin: 0,
    points: 120,
  },
];

export const mockScoringSystem = { pointsSystem: true };