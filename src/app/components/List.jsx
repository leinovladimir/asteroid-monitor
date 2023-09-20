'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/app/components/Card';
import styles from '@/app/components/AsteroidContainer.module.scss';

const List = ({ stars }) => {
  const [data, setData] = useState(stars);
  useEffect(() => {
    setData(stars);
  }, [stars]);

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </div>
  );
};

export default List;
