const isValidSemester = (year, semester) => {
  const semesters = {
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7, 8],
  };
  return semesters[year]?.includes(semester);
};

module.exports = isValidSemester;
