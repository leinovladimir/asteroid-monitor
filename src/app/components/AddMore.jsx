'use client';
import { useEffect, useState } from 'react';

import { fetchStars } from '@/actions/fetch-stars';
import { useInView } from 'react-intersection-observer';

import styles from '@/app/page.module.css';
import List from '@/app/components/List';

const AddMore = () => {
  const [stars, setStars] = useState([]);
  const [date, setDate] = useState(new Date());

  const { ref, inView } = useInView();

  const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreStars = async () => {
    // Once the page 8 is reached repeat the process all over again.

    const nextDate = new Date(date); // создаем новый объект Date на основе текущей даты
    nextDate.setDate(date.getDate() + 1);
    const newProducts = (await fetchStars(nextDate)) ?? [];
    setStars((prevProducts) => [...prevProducts, ...newProducts]);
    setDate(nextDate);
    console.log(date, stars);
  };

  useEffect(() => {
    if (inView) {
      loadMoreStars();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      <List className={styles.container} stars={[...stars]} />
      <div ref={ref} className="love" onClick={loadMoreStars}></div>
    </>
  );
};

export default AddMore;
