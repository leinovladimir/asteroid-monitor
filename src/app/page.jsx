import React, { useContext } from 'react';
import styles from './page.module.css';
// import { fetchData } from '@/utils/apiService';
import { fetchStars } from '@/actions/fetch-stars';
import Cart from '@/app/components/Cart';
import Image from 'next/image';
import List from '@/app/components/List';
import AddMore from '@/app/components/AddMore';


export default async function Home() {
  let currentDate = new Date();
  const stars = await fetchStars(currentDate);

  return (
    <>
      <header>
        <br />

        <h1>Ближайшие подлёты астероидов</h1>
        {/* <p>
          ООО “Команда им. Б. Уиллиса”. Взрываем астероиды с 1998
          года.
        </p> */}
      </header>
      <Image
        src="/img/earth.png"
        width="304"
        height="436"
        className="earth"
        alt="earth"
      />
      <br />
      {/* <span>в километрах | в лунных орбитах</span> */}
      <List className={styles.container} stars={[...stars]} />
      <AddMore />
    </>
  );
}
