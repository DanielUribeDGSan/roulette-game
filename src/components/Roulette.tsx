import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';

interface DataItem {
  id: number;
  text: string;
}

interface RouletteProps {
  data: DataItem[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const Roulette: React.FC<RouletteProps> = ({
  data,
  setOpen,
  setPoints,
  setPlay,
}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [turned, setTurned] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [rouletteData, setRouletteData] = useState<
    { completeOption: string; option: string }[]
  >([]);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setTurned(true);
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

  useEffect(() => {
    let active = true;

    if (active && !mustSpin && rouletteData.length > 1 && turned) {
      if (rouletteData[prizeNumber].completeOption === 'Pierde turno') {
        setPoints(-1);
      } else {
        setPoints(parseInt(rouletteData[prizeNumber].completeOption));
      }
      setTurned(false);
      setOpen(false);
      setPlay(true);
    }

    return () => {
      active = false;
    };
  }, [
    rouletteData,
    mustSpin,
    turned,
    prizeNumber,
    setOpen,
    setPoints,
    setPlay,
  ]);

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
                '#0b1d21',
                '#87758f',
                '#85aab0',
                '#a3c3b8',
                '#e3edd2',
                '#a8bcbd',
                '#b6dec1',
                '#0b1d21',
                '#87758f',
                '#85aab0',
                '#a3c3b8',
                '#e3edd2',
                '#b6dec1',
                '#0b1d21',
                '#87758f',
                '#85aab0',
                '#a3c3b8',
                '#e3edd2',
                '#a8bcbd',
                '#b6dec1',
                '#0b1d21',
                '#87758f',
                '#85aab0',
                '#a3c3b8',
                '#e3edd2',
                '#a8bcbd',
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
