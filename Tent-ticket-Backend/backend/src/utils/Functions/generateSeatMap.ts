export function generateSeatMap(rows: number, seatsPerRow: number) {
  const map: string[][] = [];
  const seatLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  for (let row = 1; row <= rows; row++) {
    const rowSeats: string[] = [];
    for (let seat = 0; seat < seatsPerRow; seat++) {
      rowSeats.push(`${row}${seatLetters[seat]}`);
    }
    map.push(rowSeats);
  }

  return {
    total: rows * seatsPerRow,
    available: rows * seatsPerRow,
    map,
  };
}
