import { AIRLINES_SEED } from '../seedData/airlines';
import { AIRPORTS_SEED } from '../seedData/airports';
import { generateSeatMap } from './generateSeatMap';

interface TicketSeedAirport {
  id: string;
  name: string;
  city: string;
  code: string;
}

interface TicketSeedAirline {
  id: string;
  name: string;
  code: string;
  logoUrl: string;
}

interface TicketSeedHandLuggage {
  allowed: boolean;
  quantity: number;
  dimensions: string;
  weight: number;
}

interface TicketSeedSeat {
  total: number;
  available: number;
  map: string[][];
}

interface TicketSeed {
  departureDate: Date;
  arrivalDate: Date;
  departureAirport: TicketSeedAirport;
  arrivalAirport: TicketSeedAirport;
  airline: TicketSeedAirline;
  aircraftModel: string;
  tariffName: string;
  handLuggage: TicketSeedHandLuggage;
  checkedBaggage: boolean;
  isRefundable: boolean;
  isExchangeable: boolean;
  seatSelectionType: "auto" | "manual";
  price: number;
  seats: TicketSeedSeat;
}

// Основная функция генерации билетов
export function generateTickets(
  airports: TicketSeedAirport[],
  airlines: TicketSeedAirline[],
) {
  const tickets: TicketSeed[] = [];
  const aircraftModels = [
    'Boeing 737-800',
    'Boeing 777-300ER',
    'Airbus A320',
    'Airbus A321',
    'Sukhoi Superjet 100',
  ];

  // Начальная дата - завтра (текущая дата + 1 день)
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  startDate.setHours(0, 0, 0, 0);

  for (let i = 0; i < 1000; i++) {
    // Расчет даты (10 билетов на день)
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + Math.floor(i / 30));

    // Случайное время вылета (6:00 - 23:50)
    const departureHours = Math.floor(Math.random() * 18) + 6;
    const departureMinutes = [0, 10, 20, 30, 40, 50][
      Math.floor(Math.random() * 6)
    ];
    currentDate.setHours(departureHours, departureMinutes, 0, 0);

    // Продолжительность полета (1-12 часов)
    const durationHours = Math.floor(Math.random() * 12) + 1;
    const durationMinutes = [0, 10, 20, 30, 40, 50][
      Math.floor(Math.random() * 6)
    ];
    const arrivalDate = new Date(currentDate);
    arrivalDate.setHours(currentDate.getHours() + durationHours);
    arrivalDate.setMinutes(currentDate.getMinutes() + durationMinutes);

    // Случайные аэропорты (отличные друг от друга)
    let departureAirport, arrivalAirport;
    do {
      departureAirport = airports[Math.floor(Math.random() * airports.length)];
      arrivalAirport = airports[Math.floor(Math.random() * airports.length)];
    } while (departureAirport.code === arrivalAirport.code);

    // Случайная авиакомпания
    const airline = airlines[Math.floor(Math.random() * airlines.length)];

    // Случайный тариф
    const tariffName = Math.random() > 0.7 ? 'Бизнес' : 'Эконом';

    // Параметры в зависимости от тарифа
    const handLuggage =
      tariffName === 'Бизнес'
        ? { allowed: true, quantity: 2, dimensions: '55x40x20', weight: 10 }
        : { allowed: true, quantity: 1, dimensions: '55x40x20', weight: 5 };

    const checkedBaggage =
      tariffName === 'Бизнес' ? Math.random() > 0.2 : Math.random() > 0.8;

    const isRefundable =
      tariffName === 'Бизнес' ? Math.random() > 0.1 : Math.random() > 0.9;

    const isExchangeable =
      tariffName === 'Бизнес' ? Math.random() > 0.1 : Math.random() > 0.7;

    const seatSelectionType =
      tariffName === 'Бизнес'
        ? 'manual'
        : Math.random() > 0.5
          ? 'manual'
          : 'auto';

    const price =
      tariffName === 'Бизнес'
        ? Math.floor(Math.random() * 35000) + 15000
        : Math.floor(Math.random() * 13000) + 2000;

    // Размеры салона
    const totalRows = Math.floor(Math.random() * 21) + 20; // 20-40 рядов
    const seatsPerRow = 6;

    // Формирование билета
    tickets.push({
      departureDate: currentDate,
      arrivalDate: arrivalDate,
      departureAirport,
      arrivalAirport,
      airline,
      aircraftModel:
        aircraftModels[Math.floor(Math.random() * aircraftModels.length)],
      tariffName,
      handLuggage,
      checkedBaggage,
      isRefundable,
      isExchangeable,
      seatSelectionType,
      price,
      seats: generateSeatMap(totalRows, seatsPerRow),
    });
  }

  return tickets;
}
