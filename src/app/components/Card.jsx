import React from 'react';
import Image from 'next/image';
import styles from './Card.module.scss';

export const Card = ({ data }) => (
  <div className={styles.asteroidCard}>
    <h2>{data.name}</h2>
    <div className={styles.prop}>
      <div className={styles.distant_box}>
        <div className={styles.distant_number}>{data.kilometers}</div>
        <div className={styles.arrow}>
          <i>отдаление</i>
        </div>
      </div>
      <Image
        src="/img/astro_icon.png"
        width={36 * data.astroSize}
        height={40 * data.astroSize}
        alt="astro"
      />
      <div>
        <div className={styles.name}>{data.formattedDate}</div>
        <div>
          {`Ø ${data.diametr} м`}
          {'   '}
          <span className="dangerous">
            {data.isPotentiallyHazardous && '\u{26A0}\u{FE0F} Опасен'}
          </span>
        </div>
      </div>
    </div>
    <div>
      {/* <button className={data.button}>ЗАКАЗАТЬ</button> */}
      {/* {data.isPotentiallyHazardous && '\u{26A0}\u{FE0F} Опасен'} */}
    </div>
  </div>
);
