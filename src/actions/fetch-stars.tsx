'use server';
import axios from 'axios';
import { formatDate } from '@/utils/index';
const NASA_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

// export const revalidate = 3600 // revalidate the data at most every hour

const formatData = (data: any) => {
  const {
    id,
    name,
    estimated_diameter,
    close_approach_data,
    is_potentially_hazardous_asteroid,
  } = data;

  const {
    kilometers: { estimated_diameter_max },
  } = estimated_diameter;

  const diametr = parseFloat(
    estimated_diameter.meters.estimated_diameter_max
  ).toFixed(0);

  const {
    close_approach_date,
    relative_velocity: { kilometers_per_hour },
    miss_distance: { kilometers, lunar },
    orbiting_body,
  } = close_approach_data[0];

  return {
    formattedDate: formatDate(close_approach_date),
    kilometers: `${parseFloat(kilometers)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} км`,
    lunar: `${parseFloat(lunar)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} лунных оборотов`,
    astroSize: parseInt(diametr) > 100 ? 1 : 0.6,
    name: name.replace(/[()]/g, ''),
    diametr,
    isPotentiallyHazardous: is_potentially_hazardous_asteroid,
  };
};

export const fetchStars = async (date = new Date()) => {
  const startTime = performance.now();
  const currentDay = date.toISOString().split('T')[0];
  const endpoint = `${NASA_URL}?start_date=${currentDay}&end_date=${currentDay}&api_key=${process.env.NASA_API_KEY}`;

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 460000 },
    });
    if (res.ok) {
      const rateLimitRemaining = res.headers.get(
        'x-ratelimit-remaining'
      );
      const requestId = res.headers.get('X-Vcap-Request-Id');
      console.log(
        'remaining:',
        rateLimitRemaining,
        'X-Vcap-Request-Id:',
        requestId
      );
    } else {
      throw new Error('Failed to fetch data');
    }

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    const rawStars = data.near_earth_objects[currentDay];
    const formattedStars = rawStars.map(formatData);
    const endTime = performance.now();
    console.log(`Fetch took ${endTime - startTime} milliseconds`);
    return formattedStars;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
