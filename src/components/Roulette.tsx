import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';

interface DataItem {
  id: number;
  text: string;
}

interface RouletteProps {
  data: DataItem[];
}

const Roulette: React.FC<RouletteProps> = ({ data }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [rouletteData, setRouletteData] = useState<
    { completeOption: string; option: string }[]
  >([]);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  useEffect(() => {
    const addShortString = data.map((item) => {
      return {
        completeOption: item.text,
        option:
          item.text.length >= 30
            ? item.text.substring(0, 30).trimEnd() + '...'
            : item.text,
      };
    });
    setRouletteData(addShortString);
  }, [data]);

  return (
    <div className='roulette'>
      {rouletteData.length > 1 && (
        <>
          <div className='roulette-container align-items-center'>
            <Wheel
              mustStartSpinning={mustSpin}
              spinDuration={0.8}
              prizeNumber={prizeNumber}
              data={rouletteData.length <= 0 ? [] : rouletteData}
              outerBorderColor={'#ccc'}
              outerBorderWidth={9}
              innerBorderColor={'#f2f2f2'}
              radiusLineColor={'transparent'}
              radiusLineWidth={1}
              textColors={['#f5f5f5']}
              textDistance={60}
              fontSize={18}
              backgroundColors={[
                '#000000',
                '#175fa9',
                '#169ed8',
                '#239b63',
                '#64b031',
                '#efe61f',
                '#f7a416',
                '#e6471d',
                '#dc0936',
                '#e5177b',
                '#be1180',
                '#871f7f',
                '#175fa9',
                '#000000',
                '#239b63',
                '#64b031',
                '#efe61f',
                '#f7a416',
                '#e6471d',
                '#dc0936',
                '#e5177b',
                '#be1180',
                '#871f7f',
                '#efe61f',
                '#f7a416',
                '#e6471d',
              ]}
              onStopSpinning={() => {
                setMustSpin(false);
              }}
            />
            <button
              className='button roulette-button'
              onClick={handleSpinClick}
            >
              Girar
            </button>
          </div>
          <br />
          <button
            className='prize-message'
            onClick={handleSpinClick}
            disabled={mustSpin}
          >
            {!mustSpin
              ? rouletteData[prizeNumber].completeOption
              : 'Girando...'}
          </button>
        </>
      )}
    </div>
  );
};

export default Roulette;
